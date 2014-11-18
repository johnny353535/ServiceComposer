define(["react"], function(React) {

	var MainHeader = React.createClass({
		render: function(){
			return (
				<header className="mainHeader">
			        <h3 className="title">Activity flow</h3>
			    </header>
			);
		}
	});

	return MainHeader;
});