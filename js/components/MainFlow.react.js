define(["react", "components/FlowWrapper.react", "dispatchers/AppDispatcher"], function(React, FlowWrapper, AppDispatcher) {

	'use strict';

	var MainFlow = React.createClass({
		changeGlyphicon: function(){
			AppDispatcher.dispatch({
	          actionType: 'TOGGLE_SLIDE',
	          data: {
	            open: true,
	            title: "Set Composition Icon",
	            type: "GlyphiconConfig",
	            payload: null
	          }
	        });
		},
		saveActivity: function(){
			AppDispatcher.dispatch({
	          actionType: 'SAVE_ACTIVITY'
	        });

					alert('Composition saved!');
		},
		sendToServer: function(){
			AppDispatcher.dispatch({
	          actionType: 'SEND_FLOW'
	        });
		},
		render: function(){

	        var currentUid = this.props.uid;
	        var currentElement = this.props.flow;

			return(
				<div id="mainFlow">
            		<header className="header flowHeader">
            			<button className="left"><span className={"glyphicon "+currentElement.glyphicon} onClick={this.changeGlyphicon}></span></button>
            			<h3 className="title">{currentElement.name}</h3>
            			<button className="right"><span className={"glyphicon glyphicon-share"} onClick={this.sendToServer}></span></button>
            			<button className="right"><span className={"saveActivity glyphicon glyphicon-floppy-disk"} onClick={this.saveActivity}></span></button>
            		</header>
					<FlowWrapper key={this.props.currentUid} data={currentElement} isMainFlow={true}/>
				</div>
			)
		}

	});

	return MainFlow;

});
