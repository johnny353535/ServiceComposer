define(["react", "dispatchers/AppDispatcher", "components/AddElementWrapper.react"], function(React, AppDispatcher, AddElementWrapper) {

	var Slide = React.createClass({
		getInitialState: function(){
			return {
				active: true
			}
		},
      open: function(){
        this.setState({
          active: true
        });
      },
      close: function(){
        this.setState({
          active: false
        });
      },
      emitClose: function(){
        AppDispatcher.dispatch({
        	actionType: 'TOGGLE_SLIDE',
        	data: {
        		open: false
        	}
        });
      },
      dispatcherIndex: null,
      componentDidMount: function() {
        var _this = this;

        this.dispatcherIndex = AppDispatcher.register(
          function(payload) {
              if (payload.actionType === 'TOGGLE_SLIDE') {
                  if(payload.data.open) {
                    _this.open(payload.data.rootUid);
                  } else {
                    _this.close();
                  }
              }
          }
        )
      },
      componentWillUnmount: function() {
        AppDispatcher.unregister(this.dispatcherIndex);
      },
      render: function() {

        var cx = React.addons.classSet;
        var classes = cx({
          'slide': true,
          'active': this.state.active
        });

        return (
          <div className={classes}>
          	<AddElementWrapper data={this.props.data} />
          </div>
        );
        
      }
    });

    return Slide;

});