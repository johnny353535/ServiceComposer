define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {

	var MainHeader = React.createClass({
		emitOpenMyActivities: function(){
			AppDispatcher.dispatch({
                actionType: 'TOGGLE_SLIDE',
                data: {
                  open: true,
                  title: "My Activities",
                  type: "MyActivities",
                  payload: this.props.MyActivities
                }
              });
		},
		emitNewActivity: function(){
			var name = window.prompt("Name","myFlow "+Date.now());
			if(name){
				AppDispatcher.dispatch({
			        actionType: 'CREATE_ACTIVITY',
			        data: {
			        	name: name
			        }
			      });
			}
		},
		render: function(){
			return (
				<header className="header mainHeader">
					<span className="glyphicon glyphicon-book left" onClick={this.emitOpenMyActivities}></span>
			        <h3 className="title">{this.props.title}</h3>
			        <span className="glyphicon glyphicon-plus-sign right" onClick={this.emitNewActivity}></span>
			    </header>
			);
		}
	});

	return MainHeader;
});