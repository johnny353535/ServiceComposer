define(["react", "dispatchers/AppDispatcher", "components/AddElementWrapper.react", "components/FragmentConfig.react", "components/MyActivities.react", "components/ActivityConfig.react", "components/GlyphiconConfig.react", "components/Tutorial.react"], function(React, AppDispatcher, AddElementWrapper, FragmentConfig, MyActivities, ActivityConfig, GlyphiconConfig, Tutorial) {

	'use strict';

	var Slide = React.createClass({
	  emitClose: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: { open: false }
        });
      },
      render: function() {

      	var content = null;
      	switch(this.props.data.type){
      		case("FragmentConfig"):
      			content = <FragmentConfig data={this.props.data} />
      			break;
          case("ActivityConfig"):
            content = <ActivityConfig data={this.props.data} />
            break;
          case("GlyphiconConfig"):
            content = <GlyphiconConfig data={this.props.data} />
            break;
      		case("AddElement"):
      			content = <AddElementWrapper rootUid={this.props.data.rootUid} fragments={this.props.data.fragments} activities={this.props.data.activities} myActivities={this.props.data.myActivities} hideFragments={this.props.data.hideFragments}/>;
      			break;
      		case("MyActivities"):
      			content = <MyActivities myActivities={this.props.data.myActivities}/>;
      			break;
          case("Help"):
            content = <Tutorial />;
            break;
      		default:
      			//Nufin
      	}

        return (
          <div key="slide" className="slide">
          	<header className="header">
          		<h3 className="title">{this.props.data.title}</h3>
          		<button className="right" onClick={this.emitClose}><span className="glyphicon glyphicon-remove"></span></button>
          	</header>
          	<div className="slideContent">
          		{content}
          	</div>
          </div>
        );

      }
    });

    return Slide;

});
