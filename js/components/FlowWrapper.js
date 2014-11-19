define(["react", "components/Fragment", "components/Activity", "underscore"], function(React, Fragment, Activity, _) {

	var FlowWrapper = React.createClass({
        openAddElementWrapper: function(){
            // $('.addElementWrapper').toggleClass('active');
            // $('.flowWrapper').first().toggleClass('dim');
            window.root.addElement();
        },
        addElement: function(root, elemType){
        	var newProps = this.props;
        	newProps.data.flow.push({
              "id": Math.random(),
              "type": "activity",
              "name": "test "+Math.floor((Math.random() * 100) + 1)
            });
        	this.setProps(newProps);
        },
        deleteElement: function(elemId){
        	var newProps = this.props;
        	newProps.data.flow = _.without(this.props.data.flow, _.findWhere(this.props.data.flow, {id: elemId}));
        	this.setProps(newProps);
        },
      render: function() {

      	if(this.props.root) window.root = this;

      	var _this = this;

        var flowElementNodes = this.props.data.flow.map(function (flowElement) {

            switch(flowElement.type){
                case "activity":
                    return (
                      <li key={flowElement.id}><Activity data={flowElement} deleteElement={_this.deleteElement}></Activity></li>
                    );
                case "fragment":
                    return (
                      <li key={flowElement.id}><Fragment data={flowElement} deleteElement={_this.deleteElement}></Fragment></li>
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
              <div className="flowControl panel panel-default" onClick={this.openAddElementWrapper}><span className="glyphicon glyphicon-plus"></span></div>
          </div>
        );
      }
    });

    return FlowWrapper;

});