define(["react", "dispatchers/AppDispatcher", "components/AddElementWrapper.react", "components/Weather.config.react"], function(React, AppDispatcher, AddElementWrapper, WeatherConfig) {

	var Slide = React.createClass({
	  emitClose: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: { open: false }
        });
      },
      render: function() {

      	console.log(this.props)

      	var content = null;
      	switch(this.props.data.type){
      		case("WeatherConfig"):
      			content = <WeatherConfig data={this.props.data} />
      			break;
      		case("AddElement"):
      			content = <AddElementWrapper data={this.props.data} />;
      			break
      		default: 
      			//Nufin
      	}

        return (
          <div key="slide" className="slide">
          	<button type="button" className="btn btn-default closeSlide" onClick={this.emitClose}><span className="glyphicon glyphicon-remove"></span></button>
          	{content}
          </div>
        );
        
      }
    });

    return Slide;

});