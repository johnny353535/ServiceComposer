define(["react"], function(React) {

  var Activity = React.createClass({
      delete: function(){
        
      },
      render: function() {
        return (
          <div className="flowElement activity panel panel-default">
            <div className="panel-heading">
                <span className="glyphicon glyphicon-cog"></span>
                <h3 className="panel-title">{this.props.data.name}</h3>
            </div>
            <div className="panel-body">
                {this.props.data.description}
            </div>
          </div>
        );
      }
    });

  return Activity;

})