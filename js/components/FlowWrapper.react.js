define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {

  function hide(){
    FlowWrapper.hide();
  }

  function show(){
    FlowWrapper.show();
  }


	var FlowWrapper = React.createClass({
    getInitialState: function(){
      return {
        hidden: false
      }
    },
    openAddElementWrapper: function(){
      AppDispatcher.dispatch({
        actionType: 'TOGGLE_SLIDE',
        data: {
          open: true,
          type: "AddElement",
          rootUid: this.props.data.uid
        }
      });
    },
    hide: function(){
      this.setState({hidden: true});
    },
    show: function(){
      this.setState({hidden: false});
    },
    dispatcherIndex: null,
    componentDidMount: function() {
      var _this = this;

      this.dispatcherIndex = AppDispatcher.register(
        function(payload) {
            if (payload.actionType === 'TOGGLE_SLIDE') {
                if(payload.data.open) {
                  _this.hide();
                } else {
                  _this.show();
                }
            }
        }
      )
    },
    componentWillUnmount: function() {
      AppDispatcher.unregister(this.dispatcherIndex);
    },
    render: function() {

    	var _this = this;

      var flowElementNodes = this.props.data.flow.map(function (flowElement) {

          switch(flowElement.type){
              case "activity":
                return (
                  <li key={flowElement.uid}><Activity data={flowElement}></Activity></li>
                );
              case "fragment":
                return (
                  <li key={flowElement.uid}><Fragment data={flowElement}></Fragment></li>
                );
                break;
              default:
                  // do nufin
          }
      });


      var cx = React.addons.classSet;
      var classes = cx({
        'flowWrapper': true,
        'hidden': this.state.hidden,
        'isEmpty': !flowElementNodes.length
      });

      return (
        <div className={classes}>
            <p className="empty">This branch is empty</p>
            <ul>
              {flowElementNodes}
            </ul>
            <div className="flowControl" onClick={this.openAddElementWrapper}><span className="glyphicon glyphicon-plus"></span></div>
        </div>
      );
    }
  });

  return FlowWrapper;

});