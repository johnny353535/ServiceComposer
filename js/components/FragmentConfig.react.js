define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {

	'use strict';

	var FragmentConfig = React.createClass({
      getInitialState: function(){

				var fragment = this.props.data.payload;
				var state;


				_.each(fragment.options,function (option) {

					var exists = false;

					// Check if current condition is already in use
					_.each(fragment.flows,function(flow){
							if(flow.name === option.name) {
								exists = true;
							}
					});

					if(!exists && !state) {
						state = {
							name: option.name,
							glyphicon: option.glyphicon
						}
					}

				});

        return state;
      },
      componentDidMount: function() {
        var _this = this;

      },
      componentWillUnmount: function() {
        //AppDispatcher.unregister(this.dispatcherIndex);
      },
      emitAddFlow: function(){
        AppDispatcher.dispatch({
          actionType: 'ADD_FLOW',
          data: {
            rootUid: this.props.data.payload.uid,
            name: this.state.name,
            glyphicon: this.state.glyphicon
          }
        });

        this.emitClose();
      },
      emitClose: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: { open: false }
        });
      },
      handleChange: function(event) {
        this.setState(JSON.parse(event.target.value));
      },
      render: function() {

      	var _this = this;
				var fragment = this.props.data.payload;

				// Generate possible options for conditional branches
        var options = fragment.options.map(function (option) {
          var value = {
            name: option.name,
            glyphicon: option.glyphicon
          }

					var skip = false;

					// Check if current condition is already in use
					_.each(fragment.flows,function(flow){
							if(flow.name === option.name) {
								skip = true;
							}
					});

					if(skip) return; // Skip condition if already in use
          else return (<option key={option.name} value={JSON.stringify(value)}>{option.name}</option>);

        });

        return (
          <div className="fragmentConfig">
            <h3><span className="glyphicon glyphicon-sign-out"></span>Condition</h3>
            <select id="options" name="options" onChange={this.handleChange}>
             {options}
            </select>
            <button className="left" onClick={this.emitAddFlow}><span className="glyphicon glyphicon-plus"></span></button>
          </div>
        );
      }
    });

    return FragmentConfig;

});
