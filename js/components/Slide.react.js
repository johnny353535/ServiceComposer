define(["react", "dispatchers/AppDispatcher", "components/AddElementWrapper.react", "components/FragmentConfig.react"], function(React, AppDispatcher, AddElementWrapper, FragmentConfig) {

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
      		case("FragmentConfig"):
      			content = <FragmentConfig data={this.props.data} />
      			break;
      		case("AddElement"):
      			content = <AddElementWrapper data={this.props.data} />;
      			break
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