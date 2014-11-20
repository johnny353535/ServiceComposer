define(["react", "components/FlowWrapper", "components/AddElementWrapper", "underscore"], function(React, FlowWrapper, AddElementWrapper, _) {

	var MainFlow = React.createClass({
		openAddElementWrapper: function(rootId){
			$('.addElementWrapper').toggleClass('active');
			$('.flowWrapper').first().toggleClass('dim');
		},
		insertElement: function(rootId, elementId){
			var newProps = this.props;

    		var elem = _.find(this.props.activities, {id: elementId});
    		elem.type = "activity";
          	newProps.data.flow.flow.push(elem);

          	this.setProps(newProps);
		},
		deleteElement: function(elemId){
			var newProps = this.props;
        	newProps.data.flow.flow = _.without(this.props.data.flow.flow, _.findWhere(this.props.data.flow.flow, {id: elemId}));
        	this.setProps(newProps);
		},
		render: function(){
			window.root = this;

			return(
				<div id="contentWrapper" className="contentWrapper">
					<FlowWrapper key={this.props.data.flow.id} data={this.props.data.flow} />
					<AddElementWrapper data={this.props.activities} />
				</div>
			)
		}

	});

	return MainFlow;

});