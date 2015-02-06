'use strict';

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
        var availableInputOptions = this.getPreviousInputs().map(function (output) {
          return (
            <option key={Math.random()}>{output.name} ({output.source.name})</option>
          );
        });

				// When inputs are available, show these. Otherwise render a textfield

				var availableInputOptions = <select>{availableInputOptions}</select>;
				var textfield = <input type="text" placeholder="Please enter an input-value" />;

				var availableInputs = availableInputOptions.length ? availableInputOptions : textfield;

        var inputs = this.getInputs().map(function (input) {
          return (
            <tr key={Math.random()}><td>{input.name}</td><td>{availableInputs}</td></tr>
          );
        });


        var outputs = this.getOutputs().map(function (output) {
          return (
            <tr><td key={Math.random()}>{output.name}</td></tr>
          );
        });

        console.log(inputs);

				var showDescription = !activity.description ? 'hidden': '';
        var showInputs = !inputs.length ? 'hidden' : '';
        var showOutputs = !outputs.length ? 'hidden' : '';
        var showNoData = (showInputs && showOutputs) ? 'hidden': '';

        return (
          <div className={"activityConfig "+showNoData}>
						<div className={showDescription}>
							<h3><span className="glyphicon glyphicon-list-alt"></span> Description</h3>
							<div>
								<p>{activity.description}</p>
							</div>
						</div>

            <div className={showInputs}>
              <h3><span className="glyphicon glyphicon-log-in"></span> Inputs</h3>
              <div className={"inputsWrapper "+showInputs}>
                <table className="table">
									<tr><th>Name</th><th>Source</th></tr>
                  {inputs}
                </table>
              </div>
            </div>

            <div className={showOutputs}>
              <h3><span className="glyphicon glyphicon-log-out"></span> Outputs</h3>
              <div className={"outputsWrapper "+showOutputs}>
                <table className="table">
									<tr><th>Name</th></tr>
                  {outputs}
                </table>
              </div>
            </div>
          </div>
        );
      }
    });

    return ActivityConfig;

});
