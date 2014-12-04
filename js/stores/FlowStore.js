define(["react", "dispatchers/AppDispatcher", "underscore", "minivents"], function(React, AppDispatcher, _) {

	var _flow = {
        "uid": Date.now(),
        "name": "myFlow "+Date.now(),
        "flow": []
    }

    var _uid = _flow.uid;

    var _myActivities = localStorage.getItem('myActivities') ? JSON.parse(localStorage.getItem('myActivities')) : {};
    _flow = _myActivities[1417697902033];
    

    function getFlow(name){
    	var uid = Date.now();

    	return {
          "uid": uid,
          "name": name ? name : uid,
          "type": "flow",
          "flow": []
        }
    }

    function insertActivity(root_uid, activity){

		var elem = jQuery.extend(true, {}, activity); // Make deep copy
		elem.type = "activity";
		elem.uid = Date.now();

		addElementToRoot(_flow, root_uid, elem);
      	FlowStore.emitChange();
	}

	function insertFragment(root_uid, fragment){

		var elem = jQuery.extend(true, {}, fragment); // Make deep copy
		elem.type = "fragment";
		elem.uid = Date.now();

		addElementToRoot(_flow, root_uid, elem);
      	FlowStore.emitChange();
	}

	function insertFlow(root_uid, name){
		console.log('insertFlow', root_uid, name)

		addElementToRoot(_flow, root_uid, getFlow(name), true);
      	FlowStore.emitChange();
	}

	function addElementToRoot(root, uid, elem, addFlow) {

	  if(root.uid == uid){
	  	console.log("added", elem.uid);
	  	if(addFlow)
	     root.flows.push(elem);
	 	else root.flow.push(elem);
	    return true;
	  } else if(root.flow) {
	    for(var i = 0; i<root.flow.length; i++)
	      if(root.flow[i].flows) addElementToRoot(root.flow[i], uid, elem, addFlow);
	  } else if (root.flows) {
	    for(var i = 0; i<root.flows.length; i++)
	      addElementToRoot(root.flows[i], uid, elem, addFlow);
	  }

	  return false;
	}


	function deleteElementByUid(root, uid, elem){
		if(root.flow) { // we are in a flowWrapper
		    for(var i = 0; i<root.flow.length; i++){
		      if(root.flow[i].uid == uid) {
		        console.log("deleted", uid);
		        root.flow.splice(i,1); // delete element

		        FlowStore.emitChange();

		        return true;
		      } else deleteElementByUid(root.flow[i], uid, elem);
		    }
		  } else if (root.flows) { // we are in a fragment with multiple flowWrappers
		    for(var i = 0; i<root.flows.length; i++)
		      deleteElementByUid(root.flows[i], uid, elem);
		  }

		  return false;
	}


	var FlowStore = {

		getAll: function() {
			return _flow;
		},
		emitChange: function() {
			_myActivities[_flow.uid] = _flow;

			localStorage.setItem('myActivities', JSON.stringify(_myActivities));
			console.log(_myActivities);
			this.events.emit('CHANGE');
		},

		addChangeListener: function(callback) {
			this.events.on('CHANGE', callback);
		},

		removeChangeListener: function(callback) {
			this.events.off('CHANGE', callback);
		},

		events: new Events(),

		dispatcherIndex: AppDispatcher.register(function(payload) {

			switch(payload.actionType) {
				case "ADD_ACTIVITY":
					insertActivity(payload.data.rootUid, payload.data.activity);
					break;
				case "ADD_FRAGMENT":
					insertFragment(payload.data.rootUid, payload.data.fragment);
					break;
				case "ADD_FLOW":
					insertFlow(payload.data.rootUid, payload.data.name);
					break;
				case "DELETE_ELEMENT":
					deleteElementByUid(_flow, payload.data.uid);
					break;
			}

			return true; // No errors. Needed by promise in Dispatcher.
		})

	};
	

	return FlowStore;


});
