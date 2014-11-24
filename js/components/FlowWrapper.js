define(["react", "components/Fragment", "components/Activity", "underscore"], function(React, Fragment, Activity, _) {

	var FlowWrapper = React.createClass({
      getInitialState: function(){
        return {
          hidden: false
        }
      },
      openAddElementWrapper: function(){
        window.uiDispatcher.dispatch({ actionType: 'toggleAddElementWrapper', open: true, rootUid: this.props.data.uid});
      },
      hide: function(){
        this.setState({hidden: true});
      },
      show: function(){
        this.setState({hidden: false});
      },
      render: function() {

      	var _this = this;

        window.uiDispatcher.register(
            function(payload) {
                if (payload.actionType === 'toggleAddElementWrapper') {
                    if(payload.open) {
                      _this.hide();
                    } else {
                      _this.show();
                    }
                }
            }
        );

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
              <div className="flowControl panel panel-default" onClick={this.openAddElementWrapper}><span className="glyphicon glyphicon-plus"></span></div>
          </div>
        );
      }
    });

    return FlowWrapper;

});