define(["react", "dispatchers/AppDispatcher", "underscore", "minivents"], function(React, AppDispatcher, _) {

	'use strict';

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
		console.log('insertFlow', root_uid, name);

		addElementToRoot(_flow, root_uid, getFlow(name, glyphicon), true);
	}

	function deleteFlow(uid){
		console.log('deleteFlow', uid);

		deleteElementByUid(_flow, uid, null);
	}

	function setGlyphicon(glyphicon){
		_flow.glyphicon = glyphicon;
	}

	function deleteElementByUid(root, uid, elem){
		if(root.flow) { // we are in a flowWrapper
			for(var i = 0; i<root.flow.length; i++){
				if(root.flow[i].uid == uid) {

					console.log("deleted", uid);
					root.flow.splice(i,1); // delete element

					deleteReferences(_flow, uid); // Delete all data linked to this activity

					return true;
				} else deleteElementByUid(root.flow[i], uid, elem);
			}
		} else if (root.flows) { // we are in a fragment with multiple flowWrappers
			for(var k = 0; k<root.flows.length; k++) {
				if(root.flows[k].uid === uid){

					console.log("deleted", uid);
					root.flows.splice(k,1);

					return true;
				}

				deleteElementByUid(root.flows[k], uid, elem);
			}
		}

		return false;
	}

	function deleteReferences(root, uid){
		if(root.flow) { // we are in a flowWrapper
			for(var i = 0; i<root.flow.length; i++){ // every element
				if(root.flow[i].inputArguments) {


					for(var j = 0; j <root.flow[i].inputArguments.length; j++){
						if(root.flow[i].inputArguments[j].value && root.flow[i].inputArguments[j].value.source && root.flow[i].inputArguments[j].value.source.uid === uid){
							delete root.flow[i].inputArguments[j].value; // cut it out
							console.log("deleted one reference to element", uid);
						}
					}

					return true;
				} else deleteElementByUid(root.flow[i], uid);
			}
		} else if (root.flows) { // every flowWrapper
			for(var k = 0; k<root.flows.length; k++) { // everyElement
				if(root.flows[k].inputArguments){

					for(var l = 0; l <root.flow[k].inputArguments.length; l++){
						if(root.flow[k].inputArguments[l].value && root.flow[k].inputArguments[l].value.source && root.flow[k].inputArguments[l].value.source.uid === uid){
							delete root.flow[k].inputArguments[l].value; // cut it out
							console.log("deleted one reference to element", uid);
						}
					}

					return true;
				}

				deleteReferences(root.flows[k], uid);
			}
		}

		return false;
	}

	function createActivity(name, glyphicon){
		_flow = getFlow(name, glyphicon);
	}

	function loadActivity(activity){
		_flow = activity;
	}

	function updateInputSource(root, activityId, inputId, value){

		console.log(activityId, inputId, value);
		if(root.flow) { // we are in a flowWrapper
			for(var i = 0; i<root.flow.length; i++){
				if(root.flow[i].uid == activityId) {

					var activity = root.flow[i];

					console.log("Found activity!", activity);

					for(var k = 0; k < activity.inputArguments.length; k++){
						console.log(activityId, inputId);
						console.log(activity.inputArguments[k]);
						if(activity.inputArguments[k].id === inputId){
							activity.inputArguments[k].value = value;
							console.log("updated", activityId);

							return true;
						}
					}

					return false;

				} else updateInputSource(root.flow[i], activityId, inputId, value);
			}
		} else if (root.flows) { // we are in a fragment with multiple flowWrappers
			for(var j = 0; j<root.flows.length; j++) {
				updateInputSource(root.flows[j], activityId, inputId, value);
			}
		}

		return false;
	}

	function sendToServer(){
		// Send flow to the server
		var payload = JSON.stringify(_flow);
		jQuery.post("http://127.0.0.1:3000/bpmn", {"json": payload}, function(data) {
			console.log('BPMN response:\n\n' + data);
		}, "text");
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
			for(var j = 0; j<root.flows.length; j++)
			addElementToRoot(root.flows[j], uid, elem, addFlow);
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
		};
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
		getPreviousOutputs: function(uid){

			// Returns all output parameters from previous acitivies
			var flow = _flow.flow;
			var outputs = [];

			if(flow.length < 2) return outputs;

			// Find previous Elements
			for(var i = 0; i < flow.length; i++){

				var elem = flow[i];
				if(elem.uid === uid) {
					console.log("Found the element!",outputs);
					return outputs;
				}

				// If element contains output, remember them
				if(elem.outputArguments){
					outputs = outputs.concat(this.collectOutputs(elem));
				}

				// If element contains subflows, search them
				if(elem.flows){

					for(var j; j < elem.flows.length; j++){ // For each subflow
						var subflow = elem.flows[j];
						var subflowOutputs = [];

						for(var k; k < subflow.length; k++){
							var subflowElem = subflow[k];
							if(subflowElem.uid === uid) { // Found the element!
								outputs = outputs.concat(subflowOutputs);
								console.log("Found the element in subflow!",outputs	);
								return outputs;
							}

							if(elem.outputArguments){
								subflowOutputs = subflowOutputs.concat(this.collectOutputs(subflowElem));
							}
						}
					}
				}
			}

			return outputs;
		},
		collectOutputs: function(elem){
			return _.map(elem.outputArguments, function(outputArgument){
				var source = {
					uid: elem.uid,
					id: elem.id,
					name: elem.name
				};

				outputArgument.source = source;
				return outputArgument;
			});
		},
		emitChange: function() {
			console.dir(_flow);
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
					createActivity(payload.data.name, payload.data.glyphicon);
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
								case "DELETE_FLOW":
									deleteFlow(payload.data.uid);
									break;
									case "SET_GLYPHICON":
										setGlyphicon(payload.data.glyphicon);
										break;
										case "DELETE_ELEMENT":
											deleteElementByUid(_flow, payload.data.uid);
											break;
											case "UPDATE_INPUT_SOURCE":
												updateInputSource(_flow, payload.data.uid, payload.data.inputId, payload.data.value);
												break;
												case "SEND_FLOW":
													sendToServer();
													break;
												}

												FlowStore.emitChange();

												return true; // No errors. Needed by promise in Dispatcher.
											})

										};


										return FlowStore;


									});
