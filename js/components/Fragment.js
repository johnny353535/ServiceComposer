define(["react", "require", "exports"], function(React, require, exports) {

    var Fragment = React.createClass({
      render: function() {

        var FlowWrapper = require("components/FlowWrapper");

        var first = true;
        var fragmentTabNav = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            return (
              <li role="presentation" className={className}>
                <a href={"#"+flow.name} role="tab" data-toggle="tab">{flow.name} <span className="badge">{flow.flow.length}</span></a>
              </li>
            );
        });

        first = true;
        var fragmentTabContents = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            require("components/FlowWrapper");

            return (
                <li role="tabpanel" className={"tab-pane "+className} id={flow.name}><FlowWrapper data={flow} /></li>
            );
        });

        var className = "";
        var glyphicon = "";

        switch (this.props.data.fragmentType){
            case "conditional":
                className = "panel-success fragment-conditional";
                glyphicon = "glyphicon-question-sign";
                break;
            case "parallel":
                className = "panel-warning fragment-parallel";
                glyphicon = "glyphicon-pause";
                break;
            case "loop":
                className = "panel-info fragment-loop";
                glyphicon = "glyphicon-retweet";
                break;
            default:
                className = "panel-default";
        }

        return (
          <div className={"flowElement fragment panel "+className}>
            <div className="panel-heading">
                <span className={"glyphicon "+glyphicon}></span>
                <h3 className="panel-title">{this.props.data.name}</h3>
                <span className="glyphicon glyphicon-trash button-delete" onClick={this.delete}></span>
            </div>
            <div className="condition condition-top"><span>{this.props.data.condition}</span></div>
            <div className="panel-body">
                <div>{this.props.data.description}</div>
            </div>
            <div className="fragmentWrapper">
                {/*Tab navigation*/}
                <ul className="nav nav-tabs mobile-nav-tabs" role="tablist">
                    {fragmentTabNav}
                </ul>
                {/* Tab contents */}
                <ul className="tab-content mobile-nav-content">
                    {fragmentTabContents}
                </ul>
            </div>
            <div className="condition condition-bottom"><span>{this.props.data.condition}</span></div>
        </div>
        );
      }
    });

    return Fragment;

})