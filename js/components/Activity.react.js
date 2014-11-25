define(["react"], function(React) {

  var Activity = React.createClass({
      deleteHandler: function(){
        console.l
            if(window.confirm("Are you sure you want to remove this activity?")) {
                window.root.deleteElement(this.props.data.uid);
            }
      },
      render: function() {
        return (
          <div className="flowElement activity panel panel-default">
            <div className="panel-heading">
                <span className="glyphicon glyphicon-cog"></span>
                <h3 className="panel-title">{this.props.data.name}</h3>
                <span className="glyphicon glyphicon-trash button-delete" onClick={this.deleteHandler}></span>
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