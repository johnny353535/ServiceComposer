define(["react", "components/Fragment", "components/Activity", "underscore"], function(React, Fragment, Activity, _) {

	var FlowWrapper = React.createClass({
      openAddElementWrapper: function(root_uid){
          window.root.openAddElementWrapper(root_uid);
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


        this.props;

        return (
          <div className="flowWrapper">
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