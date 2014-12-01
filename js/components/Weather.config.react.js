define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {



	var WeatherConfig = React.createClass({
      getInitialState: function(){
        return {

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
            rootUid: this.props.data.rootUid
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
      render: function() {

      	var _this = this;


        return (
          <div className="weather-config">
            <span onClick={this.emitAddFlow}>Add Weather-Branch</span>
          </div>
        );
      }
    });

    return WeatherConfig;

});