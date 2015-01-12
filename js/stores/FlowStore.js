define(["react", "dispatchers/AppDispatcher", "underscore", "minivents"], function(React, AppDispatcher, _) {

	var _flow = null; 


    /**
	*
	*	Action functions
	*
    */

    function insertActivity(root_uid, activity){

		var elem = jQuery.extend(true, {}, activity); // Make deep copy
		elem.type = "activity";
		elem.uid = Date.now();

		addElementToRoot(_flow, root_uid, elem);
	}

	function insertFragment(root_uid, fragment){

		var elem = jQuery.extend(true, {}, fragment); // Make deep copy
		elem.type = "fragment";
		elem.uid = Date.now();

		addElementToRoot(_flow, root_uid, elem);
	}

	function insertFlow(root_uid, name, glyphicon){
		console.log('insertFlow', root_uid, name)

		addElementToRoot(_flow, root_uid, getFlow(name, glyphicon), true);
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

	function createActivity(name){
		_flow = getFlow(name);
	}

	function loadActivity(activity){
		_flow = activity;
	}


	/**
	*
	* Helper functions
	*
	*/

	// inserts new elments into JSON at a desired position
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

	// Getter for a new Flow template
    function getFlow(name, glyphicon){
    	var uid = Date.now();

    	return {
          "uid": uid,
          "name": name ? name : uid,
          "type": "flow",
          "glyphicon": glyphicon ? glyphicon : "",
          "description": "kein text",
          "flow": []
        }
    }


    /*
    *
    *	FlowStore object
    *
    */

	var FlowStore = {
		loadActivity: function(activity){
			loadActivity(activity);
			this.emitChange();
		},
		getFlow: function(){
			return _flow;
		},
		emitChange: function() {
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
				case "CREATE_ACTIVITY":
					createActivity(payload.data.name);
					break;
				case "ADD_ACTIVITY":
					insertActivity(payload.data.rootUid, payload.data.activity);
					break;
				case "ADD_FRAGMENT":
					insertFragment(payload.data.rootUid, payload.data.fragment);
					break;
				case "ADD_FLOW":
					insertFlow(payload.data.rootUid, payload.data.name, payload.data.glyphicon);
					break;
				case "DELETE_ELEMENT":
					deleteElementByUid(_flow, payload.data.uid);
					break;
			}

			FlowStore.emitChange();

			return true; // No errors. Needed by promise in Dispatcher.
		})

	};
	

	return FlowStore;


});
