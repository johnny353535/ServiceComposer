define(["react", "components/FlowWrapper.react", "components/AddElementWrapper.react", "components/MainHeader.react", "stores/FlowStore", "underscore"], function(React, FlowWrapper, AddElementWrapper, MainHeader, FlowStore,_) {

	var MainFlow = React.createClass({
		getDefaultProps: function(){
			return { data: FlowStore.getAll() };
		},
		componentDidMount: function() {
			this.setProps({
				data: FlowStore.getAll(),
				activities: this.props.activities,
				fragments: this.props.fragments
			});
			FlowStore.addChangeListener(this._onChange);
		},
		componentWillUnmount: function() {
			FlowStore.removeChangeListener(this._onChange);
		},
		_onChange: function(){
			this.setProps(FlowStore.getAll());
		},
		render: function(){

			return(
				<div id="mainWrapper" className="mainWrapper">
            		<MainHeader title={this.props.data.name}/>
            	<div id="contentWrapper" className="contentWrapper">
					<FlowWrapper key={this.props.data.uid} data = {this.props.data} />
					<AddElementWrapper activities={this.props.activities} fragments={this.props.fragments} />
				</div>
          	</div>
				
			)
		}

	});

	return MainFlow;

});