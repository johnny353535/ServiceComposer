define(["react", "components/FlowWrapper", "components/AddElementWrapper", "underscore"], function(React, FlowWrapper, AddElementWrapper, _) {

	var MainFlow = React.createClass({
		getInitialState: function(){
			return {
				flowRoot: {
		            "id": Math.random()*10,
		            "name": "Test",
		            "flow": []
		        }
	        };
		},
		openAddElementWrapper: function(rootId){
			$('.addElementWrapper').toggleClass('active');
			$('.flowWrapper').first().toggleClass('dim');
		},
		insertElement: function(rootId, elementId){
			var newState = this.state;

    		var elem = _.find(this.props.activities, {id: elementId});
    		elem.type = "activity";
          	newState.flowRoot.flow.push(elem);

          	this.setState(newState);
          	this.printJSON();
		},
		deleteElement: function(elemId){
			var newState = this.state;
        	newState.flowRoot.flow = _.without(this.state.flowRoot.flow, _.findWhere(this.state.flowRoot.flow, {id: elemId}));
        	
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
					<FlowWrapper key={this.state.flowRoot.id} data={this.state.flowRoot} />
					<AddElementWrapper data={this.props.activities} />
				</div>
			)
		}

	});

	return MainFlow;

});