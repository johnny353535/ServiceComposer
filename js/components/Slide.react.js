define(["react", "dispatchers/AppDispatcher", "components/AddElementWrapper.react", "components/FragmentConfig.react", "components/MyActivities.react"], function(React, AppDispatcher, AddElementWrapper, FragmentConfig, MyActivities) {

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
      		case("AddElement"):
      			content = <AddElementWrapper rootUid={this.props.data.rootUid} fragments={this.props.data.fragments} activities={this.props.data.activities} />;
      			break;
      		case("MyActivities"):
      			content = <MyActivities myActivities={this.props.data.myActivities}/>;
      			break;
      		default: 
      			//Nufin
      	}

        return (
          <div key="slide" className="slide">
          	<header className="header">
          		<h3 className="title">{this.props.data.title}</h3>
          		<span className="glyphicon glyphicon-remove right" onClick={this.emitClose}></span>
          	</header>
          	{content}
          </div>
        );
        
      }
    });

    return Slide;

});