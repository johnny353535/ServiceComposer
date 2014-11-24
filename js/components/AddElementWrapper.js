define(["react"], function(React) {


	var AddElementWrapper = React.createClass({
      getInitialState: function(){
        return {
          active: false,
          currentRootUid: null
        };
      },
      open: function(root_uid){
        this.setState({
          active: true,
          currentRootUid: root_uid
        });
      },
      close: function(){
        this.setState({
          active: false,
          currentRootUid: null
        });
      },
      addActivity: function(activity){
        window.root.insertActivity(this.state.currentRootUid, activity.id);
        this.close();
      },
      addFragment: function(fragment){
        window.root.insertFragment(this.state.currentRootUid, fragment.id);
        this.close();
      },
      render: function() {

        window.AddElementWrapper = this;

        var _this = this;

        window.uiDispatcher.register(
            function(payload) {
                if (payload.actionType === 'toggleAddElementWrapper') {
                    if(payload.open) {
                      _this.open(payload.rootUid);
                    } else {
                      _this.close();
                    }
                }
            }
        );

        var activities = this.props.activities.map(function (activity) {

            return (
              <li key={activity.id} className="media" onClick={_this.addActivity.bind(null, activity)}>
                  <a className="media-left" href="#">
                      <img data-src="holder.js/64x64" alt="64x64" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" data-holder-rendered="true" />
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

        var cx = React.addons.classSet;
        var classes = cx({
          'addElementWrapper': true,
          'active': this.state.active
        });

        return (
          <div className={classes}>
              <div className="navWrapper">
                  <ul className="nav nav-tabs mobile-nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#activities" role="tab" data-toggle="tab">
                          <span className="glyphicon glyphicon-cog"></span>Activities</a>
                      </li>
                      <li role="presentation">
                          <a href="#fragments" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-list-alt"></span>Fragments</a>
                      </li>
                      <button type="button" className="btn btn-default" id="closeAddElementWrapper" onClick={function(){ window.uiDispatcher.dispatch({ actionType: 'toggleAddElementWrapper', open: false });} }><span className="glyphicon glyphicon-remove"></span></button>
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