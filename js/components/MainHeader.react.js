define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {

	'use strict';

	var MainHeader = React.createClass({
		emitOpenMyActivities: function(){
			AppDispatcher.dispatch({
                actionType: 'TOGGLE_SLIDE',
                data: {
                  open: true,
                  title: "Compositions",
                  type: "MyActivities",
                  payload: this.props.MyActivities
                }
              });
		},
		emitOpenHelp: function(){
			AppDispatcher.dispatch({
                actionType: 'TOGGLE_SLIDE',
                data: {
                  open: true,
                  title: "Help",
                  type: "Help"
                }
              });
		},
		emitNewActivity: function(){
			var name = window.prompt("Enter a name for the composition", Date.now());
			if(name){ // Check whether name is given
				AppDispatcher.dispatch({
			        actionType: 'CREATE_ACTIVITY',
			        data: {
			        	name: name,
			        	glyphicon: "glyphicon-asterisk"
			        }
			      });
			}
		},
		render: function(){
			return (
				<header className="header mainHeader">
					<button className="left" onClick={this.emitOpenMyActivities}><span className="glyphicon glyphicon-book"></span></button>
					<button className="left" onClick={this.emitOpenHelp}><span className="glyphicon glyphicon-question-sign"></span></button>
			        <h3 className="title">{this.props.title}</h3>
			        <button className="right" onClick={this.emitNewActivity}><span className="glyphicon glyphicon-plus-sign"></span></button>
			    </header>
			);
		}
	});

	return MainHeader;
});
