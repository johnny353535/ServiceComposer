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
			var name = window.prompt("Enter a name for the activity","myFlow "+Date.now());
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
					<button className="left" onClick={this.emitOpenMyActivities}><span className="glyphicon glyphicon-book"></span></button>
			        <h3 className="title">{this.props.title}</h3>
			        <button className="right" onClick={this.emitNewActivity}><span className="glyphicon glyphicon-plus-sign"></span></button>
			    </header>
			);
		}
	});

	return MainHeader;
});