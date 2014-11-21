define(["react", "components/FlowWrapper", "components/AddElementWrapper", "underscore"], function(React, FlowWrapper, AddElementWrapper, _) {

	var MainFlow = React.createClass({
		getInitialState: function(){
			return {
				flowRoot: {
					"uid": window.guid(),
		            "name": "Test",
		            "flow": []
		        }
	        };
		},
		openAddElementWrapper: function(root_uid){
			$('.addElementWrapper').toggleClass('active');
			$('.flowWrapper').first().toggleClass('dim');
		},
		insertElement: function(root_uid, element_id){
			var newState = this.state;

    		var elem = jQuery.extend(true, {}, _.find(this.props.activities, {id: element_id})); // Make deep copy
    		elem.type = "activity";
    		elem.uid = window.guid();

          	newState.flowRoot.flow.push(elem);

          	this.setState(newState);
          	this.printJSON();
		},
		deleteElement: function(uid){
			var newState = this.state;
        	newState.flowRoot.flow = _.without(this.state.flowRoot.flow, _.findWhere(this.state.flowRoot.flow, {uid: uid}));

        	this.setState(newState);
          	this.printJSON();
		},
		printJSON: function(){
			console.dir(this.state.flowRoot);
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