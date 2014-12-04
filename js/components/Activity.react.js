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
            <header>
                <span className={"glyphicon "+(this.props.data.glyphicon ? this.props.data.glyphicon : "glyphicon-asterisk")}></span>
                <h2 className="panel-title">{this.props.data.name}</h2>
                <span className="glyphicon glyphicon-trash button-delete" onClick={this.deleteHandler}></span>
                <span className="glyphicon glyphicon-cog button-configure"></span>
            </header>
        </div>
        );
      }
    });

  return Activity;

})