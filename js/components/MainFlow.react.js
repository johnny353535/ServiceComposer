define(["react", "components/FlowWrapper.react", "components/Slide.react", "components/MainHeader.react", "stores/FlowStore", "dispatchers/AppDispatcher", "underscore"], function(React, FlowWrapper, Slide, MainHeader, FlowStore, AppDispatcher, _) {

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var MainFlow = React.createClass({
		getInitialState: function(){
			return {
				slide: null
			}
		},
		getDefaultProps: function(){
			return {
				uid: 1417697902033,
				myActivities: FlowStore.getMyActivities()
			};
		},
		dispatcherIndex: null,
		componentDidMount: function() {
			FlowStore.addChangeListener(this._onChange);

			var _this = this;

			var url_activities = "data/activities.json";
        	var url_fragments = "data/fragments.json";

			$.when(
            $.getJSON(url_activities),
            $.getJSON(url_fragments)
	        ).done(function(activities, fragments) {
	            _this.setProps({
	            	"uid": 1417697902033,
					"myActivities": FlowStore.getMyActivities(),
	              	"activities": activities[0],
	              	"fragments": fragments[0]
	            });
	        });

			var _this = this;

			this.dispatcherIndex = AppDispatcher.register(
				function(payload) {
				  if (payload.actionType === 'TOGGLE_SLIDE') {
				  	// Open slide
				  	if(payload.data.open) {

				  		switch(payload.data.type){
				  			case("AddElement"):
				  				payload.data.activities = _this.props.activities;
				  				payload.data.fragments = _this.props.fragments;
				  				break;
				  			case("MyActivities"):
				  				payload.data.myActivities = _this.props.myActivities;
				  				break;
				  		}

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
			this.setProps(FlowStore.getMyActivities());
		},
		render: function(){

	        var slide = this.state.slide ? <Slide key="slide" data={this.state.slide} /> : null;

	        var currentUid = this.props.uid;
	        var currentElement = this.props.myActivities[currentUid];

			return(
				<div id="mainWrapper" className="mainWrapper">
            		<MainHeader title="Home Automator"/>
            	<div id="contentWrapper" className="contentWrapper">
            		<header className="header flowHeader">
            			<span className="glyphicon glyphicon-cog"></span>
            			<h3 className="title">{currentElement.name}</h3>
            			<span className="glyphicon glyphicon-floppy-disk right"></span>
            		</header>
					<FlowWrapper key={this.props.currentUid} data = {currentElement} />
					<ReactCSSTransitionGroup transitionName="slide">
						{slide}
					</ReactCSSTransitionGroup>
				</div>
          	</div>
				
			)
		}

	});

	return MainFlow;

});