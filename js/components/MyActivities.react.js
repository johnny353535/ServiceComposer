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
      deleteActivity: function(id, e){

        e.stopPropagation();


        if(confirm("Are you sure you want to delete this")) {
          AppDispatcher.dispatch({
            actionType: 'DELETE_ACTIVITY',
            data: { id: id }
          });
        }
      },
      render: function() {

      	var _this = this;

        var myActivities = [];

        for (activityUid in this.props.myActivities){

          var activity = this.props.myActivities[activityUid];
          var elem =
            <li key={activity.uid} className="media" onClick={_this.emitLoadActivity.bind(null, activityUid)}>
              <span className="media-left media-middle">
                <span className={"glyphicon "+activity.glyphicon}></span> 
              </span>
              <div className="media-body">
                <h4 className="media-heading">{activity.name}</h4>
                <p>{activity.description}</p>
              </div>
              <a href="#" className="media-right" onClick={_this.deleteActivity.bind(null, activity.uid)}>
                <span className="glyphicon glyphicon-trash"></span> 
              </a>
            </li>;

          myActivities.push(elem);
        }

        // No activities to load
        if(!myActivities.length) {
          myActivities = <li><p>No activities</p></li>;
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