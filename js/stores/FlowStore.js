define(["react", "dispatchers/AppDispatcher", "underscore", "minivents"], function(React, AppDispatcher, _) {

	var _flow = {
        "uid": Date.now(),
        "name": "myFlow",
        "flow": []
    }


    function insertActivity(root_uid, activity){

		var elem = jQuery.extend(true, {}, activity); // Make deep copy
		elem.type = "activity";
		elem.uid = window.guid();

		addElementToRoot(_flow, root_uid, elem);
      	FlowStore.emitChange();
	}

	function insertFragment(root_uid, fragment){

		var elem = jQuery.extend(true, {}, fragment); // Make deep copy
		elem.type = "fragment";
		elem.uid = window.guid();

		var standardFlow = {
          "uid": window.guid(),
          "name": "#1",
          "flow": []
        }

		elem.flows.push(standardFlow);

		addElementToRoot(_flow, root_uid, elem);
      	FlowStore.emitChange();

      	console.log(_flow);
	}

	function addElementToRoot(root, uid, elem) {

	  if(root.uid == uid){
	  	console.log("added", elem.uid);
	    root.flow.push(elem); // Found it!
	    return true;
	  } else if(root.flow) {
	    for(var i = 0; i<root.flow.length; i++)
	      if(root.flow[i].flows) return addElementToRoot(root.flow[i], uid, elem);
	  } else if (root.flows) {
	    for(var i = 0; i<root.flows.length; i++)
	      return addElementToRoot(root.flows[i], uid, elem);
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
			//console.info('FlowStore changed', _flow);
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
				case "DELETE_ELEMENT":
					deleteElementByUid(_flow, payload.data.uid);
					break;
			}

			return true; // No errors. Needed by promise in Dispatcher.
		})

	};
	

	return FlowStore;


});
