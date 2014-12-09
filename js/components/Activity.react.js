define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {

  var Activity = React.createClass({
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
                  <button className="button-configure"><span className="glyphicon glyphicon-cog"></span></button>
                  <button className="button-delete" onClick={this.deleteHandler}><span className="glyphicon glyphicon-trash"></span></button>
                </div>
            </header>
        </div>
        );
      }
    });

  return Activity;

})