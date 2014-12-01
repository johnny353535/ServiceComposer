define(["react", "dispatchers/AppDispatcher", "underscore", "minivents"], function(React, AppDispatcher, _) {

	var _flow = {
        "uid": Date.now(),
        "name": "myFlow",
        "flow": []
    }

    // Testdata
    var _flow = {"uid":1417008370951,"name":"Homecoming","flow":[{"id":"aj9d0ajsd09a","name":"Light","description":"Turn light on","url":"","type":"activity","uid":"ee1bfa08376bf242"},{"id":"conditional","type":"fragment","fragmentType":"conditional","name":"Weather","condition":"x > 42","description":"Executes encapsulated activities based on a given condition","glyphicon":"glyphicon-cloud","flows":[{"uid":"965d00576be41d7c","name":"Rainy","glyphicon":"glyphicon-tint","flow":[{"id":"akspoda0s9d2","name":"Door","description":"Unlock","glyphicon":"glyphicon-home","url":"","type":"activity","uid":"0d973b736f5d0dd0"},{"id":"parallel","type":"fragment","fragmentType":"parallel","name":"Parallel","description":"Executes multiple activitiy flows at the same time","glyphicon":"glyphicon-pause","flows":[],"uid":"4bc024968bf50508"}]}],"uid":"28750ae1918926f1"},{"id":"aspodjasd90","name":"Radiator","description":"Lower temperature to 18°C","glyphicon":"glyphicon-dashboard","url":"","type":"activity","uid":"82472f6bc8debb56"},{"id":"weather","type":"fragment","fragmentType":"conditional","name":"Weather","description":"Reacts based on the weather condition","glyphicon":"glyphicon-cloud","conditions":[{"name":"sunny","icon":"glyphicon-certificate"},{"name":"cloudy","icon":"glyphicon-cloud"},{"name":"rainy","icon":"glyphicon-tint"},{"name":"windy","icon":"glyphicon-flag"}],"flows":[],"uid":"0add6c97093ed0c5"},{"id":"parallel","type":"fragment","fragmentType":"parallel","name":"Parallel","description":"Executes multiple activitiy flows at the same time","glyphicon":"glyphicon-pause","flows":[],"uid":"c038976dd0e5d3fd"},{"id":"conditional","type":"fragment","fragmentType":"conditional","name":"Conditional","condition":"Weather","description":"Executes encapsulated activities based on a given condition","glyphicon":"glyphicon-question-sign","flows":[],"uid":"b81b7a5667ebaf27"}]};

    function getFlow(){
    	var uid = window.guid();

    	return {
          "uid": uid,
          "name": uid,
          "type": "flow",
          "flow": []
        }
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

		// var standardFlow = getFlow();

		// elem.flows.push(standardFlow);

		addElementToRoot(_flow, root_uid, elem);
      	FlowStore.emitChange();
	}

	function insertFlow(root_uid){

		addElementToRoot(_flow, root_uid, getFlow(), true);
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
				case "ADD_FLOW":
					insertFlow(payload.data.rootUid);
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
