define(["react", "require", "dispatchers/AppDispatcher"], function(React, require, AppDispatcher) {

    var Fragment = React.createClass({
        componentDidMount: function(){
          //Each parallel fragment needs at least two flows
          if (this.props.data.fragmentType == 'parallel') {
            this.addFlow();
            this.addFlow();
          }
        },
        deleteHandler: function(){
            if(window.confirm("Are you sure you want to remove this fragment?")) {
                //window.root.deleteElement(this.props.data.uid);
                AppDispatcher.dispatch({
                  actionType: "DELETE_ELEMENT",
                  data: {
                    uid: this.props.data.uid
                  }
                });
            }
        },
        addFlow: function(){
          // Pull up configuration dialog if branches need to be configured
          if(this.props.data.options && this.props.data.options.length) {
            AppDispatcher.dispatch({
                actionType: 'TOGGLE_SLIDE',
                data: {
                  open: true,
                  title: "Configure a conditional fragment",
                  type: "FragmentConfig",
                  payload: this.props.data
                }
              });
          } else if (this.props.data.fragmentType == 'parallel') {
            AppDispatcher.dispatch({
              actionType: "ADD_FLOW",
              data: {
                rootUid: this.props.data.uid,
                name: (this.props.data.flows.length + 1)
              }
            });
          }

        },
      render: function() {

        var FlowWrapper = require("components/FlowWrapper.react");

        var first = true;
        var fragmentTabNav = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            return (
              <li key={flow.uid} role="presentation" className={className}>
                <a href={"#"+flow.uid} role="tab" data-toggle="tab" className={!flow.flow.length ? "button empty" : "button"}>{flow.glyphicon ? <span className={"glyphicon "+flow.glyphicon}></span> : null}<span className="tabName short">{flow.name}</span><span className="warning glyphicon glyphicon-warning-sign"></span></a>
              </li>
            );
        });

        first = true;
        var fragmentTabContents = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            require("components/FlowWrapper.react");

            return (
                <li key={flow.uid} role="tabpanel" className={"tab-pane "+className} id={flow.uid}><FlowWrapper data={flow} /></li>
            );
        });

        var glyphicon = this.props.data.glyphicon || "glyphicon-inbox";

        var cx = React.addons.classSet;
        var classes = cx({
            'panel-success fragment-conditional': this.props.data.fragmentType == 'conditional',
            'panel-warning fragment-parallel': this.props.data.fragmentType == 'parallel',
            'panel-info fragment-loop': this.props.data.fragmentType == 'loop'
        });

        // Add highlight to Add button if no flows exist
        var active = this.props.data.flows.length ? "" : "active";

        return (
          <div className={"flowElement fragment "+classes}>
            <header className="header">
                <div className="container left">
                  <button><span className={"glyphicon "+(this.props.data.glyphicon ? this.props.data.glyphicon : "glyphicon-asterisk")}></span></button>
                  <h3 className="title">{this.props.data.name}</h3>
                </div>
                <div className="container right">
                  {/*<button className="button-configure"><span className="glyphicon glyphicon-cog"></span></button>*/}
                  <button className="button-delete" onClick={this.deleteHandler}><span className="glyphicon glyphicon-trash"></span></button>
                </div>
            </header>
            <div className="fragmentWrapper">

                {/*Tab navigation*/}
                <ul className="nav nav-tabs mobile-nav-tabs" role="tablist">
                    {fragmentTabNav}
                    <li key="addFlow"className={"tab-pane addFlow " + active}><button onClick={this.addFlow}><span className="glyphicon glyphicon-plus"></span></button></li>
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