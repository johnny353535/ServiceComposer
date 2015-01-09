define(["react", "components/FlowWrapper.react", "dispatchers/AppDispatcher"], function(React, FlowWrapper, AppDispatcher) {

	var MainFlow = React.createClass({
		saveActivity: function(){
			AppDispatcher.dispatch({
	          actionType: 'SAVE_ACTIVITY'
	        });
	        alert("Saved "+this.props.flow.name);
		},
		render: function(){

	        var currentUid = this.props.uid;
	        var currentElement = this.props.flow;

			return(
				<div id="mainFlow">
            		<header className="header flowHeader">
            			<button className="left"><span className={"glyphicon "+currentElement.glyphicon}></span></button>
            			<h3 className="title">{currentElement.name}</h3>
            			<button className="right"><span className="glyphicon glyphicon-floppy-disk" onClick={this.saveActivity}></span></button>
            		</header>
					<FlowWrapper key={this.props.currentUid} data = {currentElement} />
				</div>	
			)
		}

	});

	return MainFlow;

});