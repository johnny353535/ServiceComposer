'use strict';

define(["react", "dispatchers/AppDispatcher", "underscore", "stores/FlowStore", "minivents"], function(React, AppDispatcher, _, FlowStore) {

    var _myActivities = localStorage.getItem('myActivities') ? JSON.parse(localStorage.getItem('myActivities')) : {};


	/**
	*
	*	Localstorage functions
	*
	*/

	window.clearMyActivites = function(){
		localStorage.setItem('myActivities', "{}");
	}

	function saveMyActivities(){
		localStorage.setItem('myActivities', JSON.stringify(_myActivities));
	}



    /**
	*
	*	Action functions
	*
    */

	function loadActivity(uid){
		FlowStore.loadActivity(_myActivities[uid]);
	}

	function saveActivity(){
		var _flow = FlowStore.getFlow();
		_myActivities[_flow.uid] = _flow;
	}

	function deleteActivity(id){
		var _flow = FlowStore.getFlow();
		if(_flow && id === _flow.uid) {
			_flow = null;
		}

		delete _myActivities[id];
	}


    /*
    *
    *	MyActivitiesStore object
    *
    */

	var MyActivitiesStore = {

		getMyActivities: function() {
			return _myActivities;
		},
		emitChange: function() {
			// every change triggers a save
			saveMyActivities();
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
				// Functions that manage MyActivities
				case "LOAD_ACTIVITY":
					loadActivity(payload.data.uid);
					break;
				case "SAVE_ACTIVITY":
					saveActivity();
					break;
				 case "DELETE_ACTIVITY":
				 	deleteActivity(payload.data.id);
				 	break;
			}

			MyActivitiesStore.emitChange();

			return true; // No errors. Needed by promise in Dispatcher.
		})

	};


	return MyActivitiesStore;


});
