define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {

  var Activity = React.createClass({
      configHandler: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: {
            open: true,
            title: "Configure Activity",
            type: "ActivityConfig",
            payload: this.props
          }
        });
      },
      deleteHandler: function(){
        if(window.confirm("Are you sure you want to remove this activity?")) {
          AppDispatcher.dispatch({
            actionType: "DELETE_ELEMENT",
            data: {
              uid: this.props.data.uid
            }
          });
        }
      },
      render: function() {
        return (
          <div className={"flowElement activity"}>
            <header className="header">
                <div className="container left">
                  <button><span className={"glyphicon "+(this.props.data.glyphicon ? this.props.data.glyphicon : "glyphicon-asterisk")}></span></button>
                  <h3 className="title">{this.props.data.name}</h3>
                </div>
                <div className="container right">
                  <button className="button-configure" onClick={this.configHandler}><span className="glyphicon glyphicon-cog"></span></button>
                  <button className="button-delete" onClick={this.deleteHandler}><span className="glyphicon glyphicon-trash"></span></button>
                </div>
            </header>
            <div className="dataConfig">
              <div className="left">
                <span className="glyphicon glyphicon-log-in"></span>
                <select>
                  <option>Time</option>
                  <option>Location</option>
                  <option>Temperature</option>
                </select>
              </div>
              <div className="right">
                <span className="glyphicon glyphicon-log-out"></span>
                <span>Outputname</span>
              </div>
            </div>
        </div>
        );
      }
    });

  return Activity;

})