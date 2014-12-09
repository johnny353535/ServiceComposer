define(["react", "components/Fragment.react", "components/Activity.react", "dispatchers/AppDispatcher", "underscore"], function(React, Fragment, Activity, AppDispatcher, _) {


	var FlowWrapper = React.createClass({
    openAddElementWrapper: function(){
      AppDispatcher.dispatch({
        actionType: 'TOGGLE_SLIDE',
        data: {
          open: true,
          type: "AddElement",
          title: "Add Element",
          rootUid: this.props.data.uid
        }
      });
    },
    dispatcherIndex: null,
    componentDidMount: function() {
      var _this = this;
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
        'isEmpty': !flowElementNodes.length
      });

      return (
        <div className={classes}>
            <p className="empty">This branch is empty</p>
            <ul>
              {flowElementNodes}
              <li key="flowControl"><button className="flowElement flowControl" onClick={this.openAddElementWrapper}><span className="glyphicon glyphicon-plus"></span></button></li>
            </ul>
        </div>
      );
    }
  });

  return FlowWrapper;

});