define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {



	var FragmentConfig = React.createClass({
      componentDidMount: function() {
        var _this = this;

      },
      componentWillUnmount: function() {
        //AppDispatcher.unregister(this.dispatcherIndex);
      },
      emitLoadActivity: function(e){

        var activityUid = e;

        AppDispatcher.dispatch({
          actionType: 'LOAD_ACTIVITY',
          data: {
            uid: activityUid
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

          var activity = this.props.myActivities[activityUid];
          var elem =
            <li key={activity.uid} className="media" onClick={_this.emitLoadActivity.bind(null, activityUid)}>
              <a className="media-left" href="#">
                <span className={"glyphicon "+activity.glyphicon}></span> 
              </a>
              <div className="media-body">
                <h4 className="media-heading">{activity.name}</h4>
                <p>{activity.description}</p>
              </div>
            </li>;

          myActivities.push(elem);
        }

        return (
          <div className="myActivities">
            <ul className="media-list">
                {myActivities}
            </ul>
          </div>
        );
      }
    });

    return FragmentConfig;

});