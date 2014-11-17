define(["react", "components/Fragment", "components/Activity", "exports"], function(React, Fragment, Activity, exports) {


	var FlowWrapper = React.createClass({
        addElement: function(){
            alert('addElement');
        },
        deleteElement: function(){
            window.confirm("Are you sure you want to remove this fragment?") ? alert("true") : alert("false");
        },
      render: function() {

        var flowElementNodes = this.props.data.flow.map(function (flowElement) {

            switch(flowElement.type){
                case "activity":
                    return (
                      <li><Activity data={flowElement}></Activity></li>
                    );
                case "fragment":
                    return (
                      <li><Fragment data={flowElement}></Fragment></li>
                    );
                    break;
                default:
                    // do nufin
            }
        });

        return (
          <div className="flowWrapper">
              <ul>
                {flowElementNodes}
              </ul>
              <div className="flowControl panel panel-default" onClick={this.addElement}><span className="glyphicon glyphicon-plus"></span></div>
          </div>
        );
      }
    });

    return FlowWrapper;

});