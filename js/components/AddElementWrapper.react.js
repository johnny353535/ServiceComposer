define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {


	var AddElementWrapper = React.createClass({
      getInitialState: function(){
        return {
          currentRootUid: this.props.rootUid
        };
      },
      componentDidMount: function () {

        var _this = this;

      },
      addActivity: function(activity){

        AppDispatcher.dispatch({
          actionType: 'ADD_ACTIVITY',
          data: {
            rootUid: this.state.currentRootUid,
            activity: activity
          }
        });

        this.emitClose();
      },
      addUserActivity: function(activity){
        AppDispatcher.dispatch({
          actionType: 'ADD_USER_ACTIVITY',
          data: {
            rootUid: this.state.currentRootUid,
            activity: activity
          }
        });

        this.emitClose();
      },
      addFragment: function(fragment){

        AppDispatcher.dispatch({
          actionType: 'ADD_FRAGMENT',
          data: {
            rootUid: this.state.currentRootUid,
            fragment: fragment
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
            <li key={activity.uid} className="media" onClick={_this.addActivity.bind(null, activity)}>
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

        var activities = this.props.activities.map(function (activity) {

            return (
              <li key={activity.id} className="media" onClick={_this.addActivity.bind(null, activity)}>
                  <a className="media-left" href="#">
                    <span className={"glyphicon "+activity.glyphicon}></span> 
                  </a>
                  <div className="media-body">
                      <h4 className="media-heading">{activity.name}</h4>
                      <p>{activity.description}</p>
                  </div>
              </li>
            )
        });


        var fragments = this.props.fragments.map(function (fragment) {

            return (
              <li key={fragment.id} className="media" onClick={_this.addFragment.bind(null, fragment)}>
                  <a className="media-left" href="#">
                      <span className={"glyphicon "+fragment.glyphicon}></span> 
                  </a>
                  <div className="media-body">
                      <h4 className="media-heading">{fragment.name}</h4>
                      <p>{fragment.description}</p>
                  </div>
              </li>
            )
        });


        return (
          <div className="addElementWrapper">
              <div className="navWrapper">
                  <ul className="nav nav-tabs mobile-nav-tabs" role="tablist">
                      <li role="presentation">
                          <a href="#myActivities" role="tab" data-toggle="tab" className="button">
                            <span className="glyphicon glyphicon-book"></span><span className="tabName">MyActivities</span>
                          </a>
                      </li>
                      <li role="presentation" className="active">
                        <a href="#activities" role="tab" data-toggle="tab" className="button">
                          <span className="glyphicon glyphicon-cog"></span><span className="tabName">Activities</span>
                        </a>
                      </li>
                      <li role="presentation">
                          <a href="#fragments" role="tab" data-toggle="tab" className="button">
                            <span className="glyphicon glyphicon-list-alt"></span><span className="tabName">Fragments</span>
                          </a>
                      </li>
                  </ul>
                  <div className="tab-content mobile-nav-content">
                      <div role="tabpanel" className="tab-pane" id="myActivities">
                          <ul className="media-list">
                            {myActivities}
                          </ul>
                      </div>
                      <div role="tabpanel" className="tab-pane active" id="activities">
                          <ul className="media-list">
                              {activities}
                          </ul>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="fragments">
                          <ul className="media-list">
                              {fragments}
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
        );
      }
    });

    return AddElementWrapper;

});