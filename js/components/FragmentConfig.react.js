define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {



	var FragmentConfig = React.createClass({
      getInitialState: function(){
        return { value: this.props.data.payload.options[0].name }
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
            name: this.state.value
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
        this.setState({value: event.target.value});
      },
      render: function() {

      	var _this = this;

        var options = this.props.data.payload.options.map(function (option) {

          return (<option key={option.name} value={option.name}>{option.name}</option>);

        });

        return (
          <div className="fragmentConfig">
            <span>{this.props.data.payload.sentence}</span>
            <select id="options" name="options" onChange={this.handleChange}>
             {options}
            </select>
            <button onClick={this.emitAddFlow} className="addFlowBtn"><span>Add flow</span></button>
          </div>
        );
      }
    });

    return FragmentConfig;

});