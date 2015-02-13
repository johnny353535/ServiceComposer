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

					var availableInputOptions;
					var defaultValue;

					switch(input.type) {
						case "simpleChoice":
							// Get available input options from current activity
							availableInputOptions = input.options.map(function (option) {

								option.inputField = input.id;
								var value = JSON.stringify(option);

								return (
									<option key={Math.random()} value={value}>{option.label}</option>
								);
							});
							break;
						default:
							// Get available input data from previous activities
							availableInputOptions = this.getPreviousInputs().map(function (output) {

								output.inputField = input.id;
								var value = JSON.stringify(output);

								return (
									<option key={Math.random()} value={JSON.stringify}>{output.value.name} ({output.source.name})</option>
								);
							});

					}


					//defaultValue = (input.value === output) ? output : null; // TODO comparison doesn't work

					// When inputs are available, show these. Otherwise render a textfield

					// The standard option for input selection is a user select at runtime
					var standardInput = {'inputField': input.id};

					if(input.value) input.value.inputField = input.id; // This field has to be added, so React can check wether the selected option matches the current value of an input

					var availableInputs = <select onChange={this.handleOptionsChange} value={JSON.stringify(input.value)}><option value={JSON.stringify(standardInput)}>User Select</option>{availableInputOptions}</select>;

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
							<p className="small">The default value for inputs is <b><span className="glyphicon glyphicon-pencil"></span> User Select</b>, which lets the user pick the input's value when the service composition is being executed.</p>
              <div className={"inputsWrapper "+showInputs}>
                <table className="table dataTable">
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
