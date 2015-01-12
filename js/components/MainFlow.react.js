define(["react", "components/FlowWrapper.react", "dispatchers/AppDispatcher"], function(React, FlowWrapper, AppDispatcher) {

	var MainFlow = React.createClass({
		changeGlyphicon: function(){
			AppDispatcher.dispatch({
	          actionType: 'TOGGLE_SLIDE',
	          data: {
	            open: true,
	            title: "Set Activity Icon",
	            type: "GlyphiconConfig",
	            payload: null
	          }
	        });
		},
		saveActivity: function(){
			AppDispatcher.dispatch({
	          actionType: 'SAVE_ACTIVITY'
	        });

	        $('.flowHeader .saveActivity').addClass('saved'); // Just until next render
		},
		render: function(){

	        var currentUid = this.props.uid;
	        var currentElement = this.props.flow;

			return(
				<div id="mainFlow">
            		<header className="header flowHeader">
            			<button className="left"><span className={"glyphicon "+currentElement.glyphicon} onClick={this.changeGlyphicon}></span></button>
            			<h3 className="title">{currentElement.name}</h3>
            			<button className="right"><span className={"saveActivity glyphicon glyphicon-floppy-disk"} onClick={this.saveActivity}></span></button>
            		</header>
					<FlowWrapper key={this.props.currentUid} data = {currentElement} />
				</div>	
			)
		}

	});

	return MainFlow;

});