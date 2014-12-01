define(["react"], function(React) {

	var MainHeader = React.createClass({
		render: function(){
			return (
				<header className="header mainHeader">
					<span className="glyphicon glyphicon-book left"></span>
			        <h3 className="title">{this.props.title}</h3>
			        <span className="glyphicon glyphicon-plus-sign right"></span>
			    </header>
			);
		}
	});

	return MainHeader;
});