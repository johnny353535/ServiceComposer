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
        AppDispatcher.dispatch({ actionType: 'toggleAddElementWrapper', open: true, rootUid: this.props.data.uid});
      },
      hide: function(){
        this.setState({hidden: true});
      },
      show: function(){
        this.setState({hidden: false});
      },
      dispatcherIndex: AppDispatcher.register(
            function(payload) {
                if (payload.actionType === 'toggleAddElementWrapper') {
                    if(payload.open) {
                      hide();
                    } else {
                      show();
                    }
                }
            }
        ),
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
          'hidden': this.state.hidden
        });

        return (
          <div className={classes}>
              <ul>
                {flowElementNodes}
              </ul>
              <div className="flowControl panel panel-default btn btn-default" onClick={this.openAddElementWrapper}><span className="glyphicon glyphicon-plus"></span></div>
          </div>
        );
      }
    });

    return FlowWrapper;

});