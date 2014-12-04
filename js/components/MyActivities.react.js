define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {



	var FragmentConfig = React.createClass({
      componentDidMount: function() {
        var _this = this;

      },
      componentWillUnmount: function() {
        //AppDispatcher.unregister(this.dispatcherIndex);
      },
      emitLoadActivity: function(e){
        AppDispatcher.dispatch({
          actionType: 'LOAD_ACTIVITY',
          data: {
            activityId: e
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

        var myActivities = [];

        for (activityUid in this.props.myActivities){
          myActivities.push(<li key={activityUid}>{this.props.myActivities[activityUid].name}</li>);
        }

        return (
          <div className="myActivities">
            <ul>
              {myActivities}
            </ul>
          </div>
        );
      }
    });

    return FragmentConfig;

});