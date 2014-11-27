define(["react", "components/FlowWrapper.react", "components/Slide.react", "components/MainHeader.react", "stores/FlowStore", "dispatchers/AppDispatcher", "underscore"], function(React, FlowWrapper, Slide, MainHeader, FlowStore, AppDispatcher, _) {

	var MainFlow = React.createClass({
		getInitialState: function(){
			return {
				slide: null
			}
		},
		getDefaultProps: function(){
			return { data: FlowStore.getAll() };
		},
		dispatcherIndex: null,
		componentDidMount: function() {
			this.setProps({
				data: FlowStore.getAll(),
				activities: this.props.activities,
				fragments: this.props.fragments
			});
			FlowStore.addChangeListener(this._onChange);

			var _this = this;

			this.dispatcherIndex = AppDispatcher.register(
				function(payload) {
				  if (payload.actionType === 'TOGGLE_SLIDE') {
				  	if(payload.data.open) {
				      _this.setState({
				      	slide: payload.data
				      });
				  	} else {
				  		_this.setState({
				  			slide: null
				  		})
				  	}
				  }
				}
	        )
		},
		componentWillUnmount: function() {
			FlowStore.removeChangeListener(this._onChange);
			AppDispatcher.unregister(this.dispatcherIndex);
		},
		_onChange: function(){
			this.setProps(FlowStore.getAll());
		},
		render: function(){

			

	        var slide = this.state.slide ? <Slide data={this.state.slide} /> : null;

			return(
				<div id="mainWrapper" className="mainWrapper">
            		<MainHeader title={this.props.data.name}/>
            	<div id="contentWrapper" className="contentWrapper">
					<FlowWrapper key={this.props.data.uid} data = {this.props.data} />
					{slide}
				</div>
          	</div>
				
			)
		}

	});

	return MainFlow;

});