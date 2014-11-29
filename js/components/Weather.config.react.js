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
      render: function() {

      	var _this = this;


        return (
          <div className="weather-config">
            Weather!!
          </div>
        );
      }
    });

    return WeatherConfig;

});