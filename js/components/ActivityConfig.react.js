define(["react", "dispatchers/AppDispatcher", "stores/FlowStore"], function(React, AppDispatcher, FlowStore) {

	var ActivityConfig = React.createClass({
      emitClose: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: { open: false }
        });
      },
      getInputs: function(){
        // Returns a list of all available outputs
        return FlowStore.getPreviousOutputs(this.props.data.uid);
      },
      getOutputs: function(){
        // Returns a list of all outputs provided by this activity
        return this.props.data.outputArguments ? this.props.data.outputArguments : [];
      },
      render: function() {

        var inputs = this.getInputs().map(function (output) {
          var key = new Date().getTime().toString()+output;
          return (
            <option key={key}>{output}</option>
          );
        });

        var outputs = this.getOutputs().map(function (output) {
          var key = new Date().getTime().toString()+output;
          return (
            <li key={key}>{output}</li>
          );
        });

        var showInputs = !inputs.length ? 'hidden' : '';
        var showOutputs = !outputs.length ? 'hidden' : '';
        var showNoData = (showInputs && showOutputs) ? 'hidden': '';

        return (
          <div className={"activityConfig "+showNoData}>
            <div className={showInputs}>
              <h3><span className="glyphicon glyphicon-sign-in"></span>Inputs</h3>
              <div className={"inputsWrapper "+showInputs}>
                <select>
                  {inputs}
                </select>
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