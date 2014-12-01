define(["react"], function(React) {

	var MainHeader = React.createClass({
		render: function(){
			return (
				<header className="header mainHeader">
			        <h3 className="title">{this.props.title}</h3>
			    </header>
			);
		}
	});

	return MainHeader;
});