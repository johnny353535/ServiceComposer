define(["react", "components/FlowWrapper", "components/AddElementWrapper", "underscore"], function(React, FlowWrapper, AddElementWrapper, _) {

	var MainFlow = React.createClass({
		getInitialState: function(){
			return {
				flowRoot: {
					"uid": window.guid(),
		            "flow": []
		        }
	        };
		},
		insertActivity: function(root_uid, activity_id){
			var newState = this.state;

    		var elem = jQuery.extend(true, {}, _.find(this.props.activities, {id: activity_id})); // Make deep copy
    		elem.type = "activity";
    		elem.uid = window.guid();

    		var root = window.findObjectById(newState.flowRoot, root_uid, true);
    		root.flow.push(elem);

          	this.setState(newState);
          	console.dir(this.state.flowRoot); // Print current structure
		},
		insertFragment: function(root_uid, fragment_id){
			var newState = this.state;

    		var elem = jQuery.extend(true, {}, _.find(this.props.fragments, {id: fragment_id})); // Make deep copy
    		elem.type = "fragment";
    		elem.uid = window.guid();

    		var root = window.findObjectById(newState.flowRoot, root_uid, true);
    		root.flow.push(elem);

          	this.setState(newState);
          	console.dir(this.state.flowRoot); // Print current structure
		},
		deleteElement: function(uid){
			var newState = this.state;

        	//newState.flowRoot.flow = _.without(this.state.flowRoot.flow, _.findWhere(this.state.flowRoot.flow, {uid: uid}));
        	window.findObjectById(newState.flowRoot, uid, false)


        	this.setState(newState);
          	console.dir(this.state.flowRoot); // Print current structure
		},
		render: function(){
			window.root = this;

			return(
				<div id="contentWrapper" className="contentWrapper">
					<FlowWrapper key={this.state.flowRoot.uid} data={this.state.flowRoot} />
					<AddElementWrapper data={this.props.activities} />
				</div>
			)
		}

	});

	return MainFlow;

});