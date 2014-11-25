define(["react", "dispatchers/AppDispatcher", "underscore"], function(React, AppDispatcher, _) {

	var CHANGE_EVENT = 'change';

	var _activities = {}; // collection of todo items

	$.getJSON("../../data/activities.json", function(data){
		_activities = data;
		this.emit(CHANGE_EVENT);
	});

	var ActivityStore = {

		/** * Get the entire collection of TODOs. * @return {object} */
		getAll: function() {
			return _todos;
		},
		emitChange: function() {
			this.emit(CHANGE_EVENT);
		},

		/** * @param {function} callback */
		addChangeListener: function(callback) {
			this.on(CHANGE_EVENT, callback);
		},

		/** * @param {function} callback */
		removeChangeListener: function(callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},

		dispatcherIndex: AppDispatcher.register(function(payload) {
			var action = payload.action;
			var text;

			switch(action.actionType) {
				case TodoConstants.TODO_CREATE:
					text = action.text.trim();
					if (text !== '') {
						create(text); TodoStore.emitChange();
					}
					break;
				case TodoConstants.TODO_DESTROY:
					destroy(action.id);
					TodoStore.emitChange();
					break;
				// add more cases for other actionTypes, like TODO_UPDATE, etc.
			}

			return true; // No errors. Needed by promise in Dispatcher.
		})

	};

	return ActivityStore;


});