define(["react", "dispatchers/AppDispatcher", "stores/FlowStore"], function(React, AppDispatcher, FlowStore) {

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

        var inputArguments = this.props.data.inputArguments ? this.props.data.inputArguments : []
        var inputs = inputArguments.map(function (input) {
          var key = new Date().getTime().toString()+input.name;

          return (
            <li key={key}>{input.name}</li>
          );
        });

        var outputArguments = this.props.data.outputArguments ? this.props.data.outputArguments : []
        var outputs = outputArguments.map(function (output) {
          var key = new Date().getTime().toString()+output.name;

          return (
            <li key={key}>{output.name}</li>
          );
        });

        var showInputs = !inputs.length ? 'hidden' : '';
        var showOutputs = !outputs.length ? 'hidden' : '';
        var showNoData = (showInputs && showOutputs) ? 'hidden': '';

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
            <div className={"dataConfig "+showNoData} onClick={this.configHandler}>
              <div className="dataConfigInner">
                <div className={"left "+showInputs}>
                  <span className="glyphicon glyphicon-log-in"></span>
                  <ul className="inputs">
                    {inputs}
                  </ul>
                </div>
                <div className={"right "+showOutputs}>
                  <span className="glyphicon glyphicon-log-out"></span>
                  <ul className="outputs">
                    {outputs}
                  </ul>
                </div>
              </div>
            </div>
        </div>
        );
      }
    });

  return Activity;

})