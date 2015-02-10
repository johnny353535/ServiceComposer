define(["react", "dispatchers/AppDispatcher", "stores/FlowStore"], function(React, AppDispatcher, FlowStore) {

	'use strict';

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
			handleOptionsChange: function(event){

				var value = JSON.parse(event.target.value);

				var payload = {
					value: value,
					uid: this.props.data.payload.data.uid,
					inputId: value.inputField
				};

				AppDispatcher.dispatch({
					actionType: 'UPDATE_INPUT_SOURCE',
					data: payload
				});
			},
			handleTextfieldChange: function(){

			},
      render: function() {

        var activity = this.props.data.payload.data;

        var inputs = this.getInputs().map(function (input) {


					// Get available input data from previous activities
					var availableInputOptions;
					var defaultValue;

					switch(input.type) {
						case "simpleChoice":
							availableInputOptions = input.options.map(function (option) {

								defaultValue = (input.value === option) ? option : null; // TODO comparison doesn't work
								option.inputField = input.id;
								var value = JSON.stringify(option);

								return (
									<option key={Math.random()} value={value}>{option.label}</option>
								);
							});
							break;
						default:
							availableInputOptions = this.getPreviousInputs().map(function (output) {

								defaultValue = (input.value === output) ? output : null; // TODO comparison doesn't work
								output.inputField = input.id;
								var value = JSON.stringify(output);

								return (
									<option key={Math.random()} value={value} defaultValue={defaultValue}>{output.value.name} ({output.source})</option>
								);
							});

					}


					// When inputs are available, show these. Otherwise render a textfield

					var select = <select onChange={this.handleOptionsChange} value="null"><option value="null">-- Please select an option --</option>+{availableInputOptions}+</select>;
					var textfield = <input type="text" placeholder="Please fill out" onChange={this.handleTextfieldChange} />;

					var availableInputs = availableInputOptions.length ? select : textfield;

          return (
            <tr key={Math.random()}><td>{input.name}</td><td>{availableInputs}</td></tr>
          );
        }.bind(this));


        var outputs = this.getOutputs().map(function (output) {
          return (
            <tr key={Math.random()}><td>{output.name}</td></tr>
          );
        });

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
									<tbody>
										<tr><th>Name</th><th>Source</th></tr>
	                  {inputs}
									</tbody>
                </table>
              </div>
            </div>

            <div className={showOutputs}>
              <h3><span className="glyphicon glyphicon-log-out"></span> Outputs</h3>
              <div className={"outputsWrapper "+showOutputs}>
                <table className="table">
									<tbody>
										<tr><th>Name</th></tr>
	                  {outputs}
									</tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    });

    return ActivityConfig;

});
