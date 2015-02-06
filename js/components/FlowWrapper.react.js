'use strict';

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
    deleteHandler: function(){
      if(window.confirm("Are you sure you want to remove this conditional branch?")) {
          //window.root.deleteElement(this.props.data.uid);
          AppDispatcher.dispatch({
            actionType: "DELETE_FLOW",
            data: {
              uid: this.props.data.uid
            }
          });
      }
    },
    componentDidMount: function() {
      var _this = this;
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

      console.log(this.props.data);

      return (
        <div className={classes}>
            <header className="header flowHeader">
              <div className="left"><span className={"glyphicon "+this.props.data.glyphicon}></span>{this.props.data.name}</div>
              <button className="right" onClick={this.deleteHandler}><span className="glyphicon glyphicon-trash"></span></button>
            </header>
            <p className="empty"><span className="warning glyphicon glyphicon-warning-sign"></span> This branch is empty. Please add an activity.</p>
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
