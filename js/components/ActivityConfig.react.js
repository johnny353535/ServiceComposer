define(["react", "dispatchers/AppDispatcher", "stores/FlowStore"], function(React, AppDispatcher, FlowStore) {

	var ActivityConfig = React.createClass({
      emitClose: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: { open: false }
        });
      },
      getPreviousInputs: function(){
        // Returns a list of all available outputs
        var activity = this.props.data.payload.data;
        return FlowStore.getPreviousOutputs(activity.uid);
      },
      getInputs: function(){
        // Returns a list of all inputs required by this activity

        var activity = this.props.data.payload.data;
        return activity.inputArguments ? activity.inputArguments : [];
      },
      getOutputs: function(){
        // Returns a list of all outputs provided by this activity

        var activity = this.props.data.payload.data;
        return activity.outputArguments ? activity.outputArguments : [];
      },
      render: function() {

        var activity = this.props.data.payload.data;

        // Get available input data from previous activities
        var availableInputs = this.getPreviousInputs().map(function (output) {
          return (
            <option key={Math.random()}>{output}</option>
          );
        });

        var inputs = this.getInputs().map(function (input) {
          return (
            <li key={Math.random()}>{input.name}: <select>{availableInputs}</select></li>
          );
        });


        var outputs = this.getOutputs().map(function (output) {
          return (
            <li key={Math.random()}>{output.name}</li>
          );
        });

        console.log(inputs);
        var showInputs = !inputs.length ? 'hidden' : '';
        var showOutputs = !outputs.length ? 'hidden' : '';
        var showNoData = (showInputs && showOutputs) ? 'hidden': '';

        return (
          <div className={"activityConfig "+showNoData}>
            <div className={showInputs}>
              <h3><span className="glyphicon glyphicon-sign-in"></span>Inputs</h3>
              <div className={"inputsWrapper "+showInputs}>
                <ul>
                  {inputs}
                </ul>
              </div>
            </div>

            <div className={showOutputs}>
              <h3><span className="glyphicon glyphicon-sign-out"></span>Outputs</h3>
              <div className={"outputsWrapper "+showOutputs}>
                <ul>
                  {outputs}
                </ul>
              </div>
            </div>
          </div>
        );
      }
    });

    return ActivityConfig;

});