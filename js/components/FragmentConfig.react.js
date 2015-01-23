define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {



	var FragmentConfig = React.createClass({
      getInitialState: function(){
        return {
          name: this.props.data.payload.options[0].name,
          glyphicon: this.props.data.payload.options[0].glyphicon
        }
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

        var options = this.props.data.payload.options.map(function (option) {
          var value = {
            name: option.name,
            glyphicon: option.glyphicon
          }
          return (<option key={option.name} value={JSON.stringify(value)}>{option.name}</option>);

        });

        return (
          <div className="fragmentConfig">
            <span>Conditions:</span>
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