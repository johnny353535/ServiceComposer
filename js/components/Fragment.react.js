define(["react", "require", "dispatchers/AppDispatcher"], function(React, require, AppDispatcher) {

    var Fragment = React.createClass({
        deleteHandler: function(){
            if(window.confirm("Are you sure you want to remove this activity?1")) {
                //window.root.deleteElement(this.props.data.uid);
                AppDispatcher.dispatch({
                  actionType: "DELETE_ELEMENT",
                  data: {
                    uid: this.props.data.uid
                  }
                });
            }
        },
        addFlowHandler: function(){
            AppDispatcher.dispatch({
              actionType: "ADD_FLOW",
              data: {
                rootUid: this.props.data.uid
              }
            });
        },
        addFlowDialog: function(){
            AppDispatcher.dispatch({
                actionType: 'TOGGLE_SLIDE',
                data: {
                  open: true,
                  title: "Configure a weather fragment",
                  type: "WeatherConfig"
                }
              });
        },
      render: function() {

        var FlowWrapper = require("components/FlowWrapper.react");

        var first = true;
        var fragmentTabNav = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            return (
              <li key={flow.name} role="presentation" className={className}>
                <a href={"#"+flow.name} role="tab" data-toggle="tab"><span className={"glyphicon "+flow.glyphicon}></span><span className="tabName short">{flow.name}</span><span className={!flow.flow.length ? "badge empty" : "badge"}>{flow.flow.length}</span></a>
              </li>
            );
        });

        first = true;
        var fragmentTabContents = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            require("components/FlowWrapper.react");

            return (
                <li key={flow.uid} role="tabpanel" className={"tab-pane "+className} id={flow.name}><FlowWrapper data={flow} /></li>
            );
        });

        var glyphicon = this.props.data.glyphicon || "glyphicon-inbox";

        var cx = React.addons.classSet;
        var classes = cx({
            'panel-success fragment-conditional': this.props.data.fragmentType == 'conditional',
            'panel-warning fragment-parallel': this.props.data.fragmentType == 'parallel',
            'panel-info fragment-loop': this.props.data.fragmentType == 'loop'
        });

        return (
          <div className={"flowElement fragment "+classes}>
            <header>
                <span className={"glyphicon "+glyphicon}></span>
                <h2 className="panel-title">{this.props.data.name}</h2>
                <span className="glyphicon glyphicon-trash button-delete" onClick={this.deleteHandler}></span>
            </header>
            <div className="fragmentWrapper">

                {/*Tab navigation*/}
                <ul className="nav nav-tabs mobile-nav-tabs" role="tablist">
                    {fragmentTabNav}
                    <span className="btn glyphicon glyphicon-plus addConditionalBranch" onClick={this.addFlowDialog}></span>
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