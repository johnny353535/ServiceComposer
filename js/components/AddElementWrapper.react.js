define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {


	var AddElementWrapper = React.createClass({
      getInitialState: function(){
        console.log(this.props.data.rootUid)
        return {
          currentRootUid: this.props.data.rootUid,
          activities: [],
          fragments: []
        };
      },
      componentDidMount: function () {

        var _this = this;

        var url_activities = "data/activities.json";
        var url_fragments = "data/fragments.json";

        $.when(
            $.getJSON(url_activities),
            $.getJSON(url_fragments)
        ).done(function(activities, fragments) {
            _this.setState({
              "activities": activities[0],
              "fragments": fragments[0]
            });
        });
      },
      addActivity: function(activity){
        console.log('add')

        AppDispatcher.dispatch({
          actionType: 'ADD_ACTIVITY',
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

        var activities = this.state.activities.map(function (activity) {

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

        var fragments = this.state.fragments.map(function (fragment) {

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
                      <li role="presentation" className="active"><a href="#activities" role="tab" data-toggle="tab">
                          <span className="glyphicon glyphicon-cog"></span><span className="tabName">Activities</span></a>
                      </li>
                      <li role="presentation">
                          <a href="#fragments" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-list-alt"></span><span className="tabName">Fragments</span></a>
                      </li>
                  </ul>
                  <div className="tab-content mobile-nav-content">
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