define(["react", "components/FlowWrapper.react", "components/AddElementWrapper.react", "components/MainHeader.react", "underscore"], function(React, FlowWrapper, AddElementWrapper, MainHeader, _) {

	var MainFlow = React.createClass({
		insertActivity: function(root_uid, activity_id){
			var newProps = this.props;

    		var elem = jQuery.extend(true, {}, _.find(this.props.activities, {id: activity_id})); // Make deep copy
    		elem.type = "activity";
    		elem.uid = window.guid();

    		var root = this.addElementToRoot(newProps.data, root_uid, elem);

          	this.setProps(newProps);
		},
		insertFragment: function(root_uid, fragment_id){
			var newProps = this.props;

    		var elem = jQuery.extend(true, {}, _.find(this.props.fragments, {id: fragment_id})); // Make deep copy
    		elem.type = "fragment";
    		elem.uid = window.guid();

    		var standardFlow = {
	          "uid": window.guid(),
	          "name": "#1",
	          "flow": []
	        }

    		elem.flows.push(standardFlow);

    		var root = this.addElementToRoot(newProps.data, root_uid, elem);

          	this.setProps(newProps);
		},
		addElementToRoot: function(root, uid, elem) {

		  if(root.uid == uid){
		  	console.log("added", elem.uid);
		    root.flow.push(elem); // Found it!
		    return true;
		  } else if(root.flow) {
		    for(var i = 0; i<root.flow.length; i++)
		      if(root.flow[i].flows) return this.addElementToRoot(root.flow[i], uid, elem);
		  } else if (root.flows) {
		    for(var i = 0; i<root.flows.length; i++)
		      return this.addElementToRoot(root.flows[i], uid, elem);
		  }

		  return false;
		},
		deleteElement: function(uid){
			var newProps = this.props;

        	this.deleteElementByUid(newProps.data, uid);

        	this.setProps(newProps);
		},
		deleteElementByUid: function(root, uid, elem) {

		  if(root.flow) { // we are in a flowWrapper
		    for(var i = 0; i<root.flow.length; i++){
		      if(root.flow[i].uid == uid) {
		        console.log("deleted", uid);
		        root.flow.splice(i,1); // delete element
		        return true;
		      } else this.deleteElementByUid(root.flow[i], uid, elem);
		    }
		  } else if (root.flows) { // we are in a fragment with multiple flowWrappers
		    for(var i = 0; i<root.flows.length; i++)
		      this.deleteElementByUid(root.flows[i], uid, elem);
		  }

		  return false;
		},
		render: function(){

			window.root = this;

			return(
				<div id="mainWrapper" className="mainWrapper">
            		<MainHeader title={this.props.data.name}/>
            	<div id="contentWrapper" className="contentWrapper">
					<FlowWrapper key={this.props.data.uid} data={this.props.data} />
					<AddElementWrapper activities={this.props.activities} fragments={this.props.fragments} />
				</div>
          	</div>
				
			)
		}

	});

	return MainFlow;

});