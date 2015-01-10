define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {



	var ActivityConfig = React.createClass({
      emitClose: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: { open: false }
        });
      },
      render: function() {

      	var _this = this;

        return (
          <div className="activityConfig">
            ActivityConfig
          </div>
        );
      }
    });

    return ActivityConfig;

});