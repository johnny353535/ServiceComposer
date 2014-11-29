define(["react", "dispatchers/AppDispatcher", "components/AddElementWrapper.react"], function(React, AppDispatcher, AddElementWrapper) {

	var Slide = React.createClass({
      render: function() {

        return (
          <div key="slide" className="slide">
          	<AddElementWrapper data={this.props.data} />
          </div>
        );
        
      }
    });

    return Slide;

});