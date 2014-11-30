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
                <span className="glyphicon glyphicon-cog"></span>
                <h2 className="panel-title">{this.props.data.name}</h2>
                <span className="glyphicon glyphicon-trash button-delete" onClick={this.deleteHandler}></span>
            </header>
            <div className="content">
                <p>{this.props.data.description}</p>
            </div>
        </div>
        );
      }
    });

  return Activity;

})