define(["react", "components/MainFlow.react", "components/Slide.react", "components/MainHeader.react", "components/Tutorial.react", "stores/FlowStore", "stores/MyActivitiesStore","dispatchers/AppDispatcher", "underscore"], function(React, MainFlow, Slide, MainHeader, Tutorial, FlowStore, MyActivitiesStore, AppDispatcher, _) {

	'use strict';

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var Main = React.createClass({
		getInitialState: function(){
			return {
				slide: null
			}
		},
		getDefaultProps: function(){
			return {
				flow: FlowStore.getFlow(),
				myActivities: MyActivitiesStore.getMyActivities(),
				activities: null,
				fragments: null
			};
		},
		dispatcherIndex: null,
		componentDidMount: function() {
			FlowStore.addChangeListener(this._onChange);
			MyActivitiesStore.addChangeListener(this._onChange);

			var _this = this;

			var url_activities = "data/activities.json";
        	var url_fragments = "data/fragments.json";

        	//var url_activities = "http://localhost:3000/activities";
			//var url_fragments = "http://localhost:3000/fragments";

			$.when(
            $.getJSON(url_activities),
            $.getJSON(url_fragments)
	        ).done(function(activities, fragments) {
	            _this.setProps({
	            	"flow": FlowStore.getFlow(),
					"myActivities": MyActivitiesStore.getMyActivities(),
	              	"activities": activities[0],
	              	"fragments": fragments[0]
	            });
	        });

			this.dispatcherIndex = AppDispatcher.register(
				function(payload) {
				  if (payload.actionType === 'TOGGLE_SLIDE') {
				  	// Open slide
				  	if(payload.data.open) {

				  		switch(payload.data.type){
				  			case("AddElement"):
				  				payload.data.activities = _this.props.activities;
				  				payload.data.fragments = _this.props.fragments;
				  				payload.data.myActivities = _this.props.myActivities;
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
			MyActivitiesStore.removeChangeListener(this._onChange);
			AppDispatcher.unregister(this.dispatcherIndex);
		},
		_onChange: function(){
			this.setProps({
	        	"flow": FlowStore.getFlow(),
				"myActivities": MyActivitiesStore.getMyActivities(),
	          	"activities": this.props.activities,
	          	"fragments": this.props.fragments
	        });
		},
		render: function(){

	        var slide = this.state.slide ? <Slide key="slide" data={this.state.slide} /> : null;

	        var currentUid = this.props.uid;
	        var currentElement = this.props.flow;

	        var content = currentElement ? <MainFlow flow={this.props.flow} /> : <Tutorial />;

			return(
				<div id="mainWrapper" className="mainWrapper">
            		<MainHeader title="Service Composer"/>
	            	<div id="contentWrapper" className="contentWrapper">
	            		{content}
						<ReactCSSTransitionGroup transitionName="slide">
							{slide}
						</ReactCSSTransitionGroup>
					</div>
	          	</div>

			)
		}

	});

	return Main;

});
