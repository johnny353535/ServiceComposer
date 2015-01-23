define(["react"], function(React) {

	var Tutorial = React.createClass({
		render: function(){

			return(
				<div className="tutorial">
					<div className="help">
						<h4>Help</h4>
						<ul>
							<li>Tap <span className="glyphicon glyphicon-book"></span> to load a composition</li>
							<li>Tap <span className="glyphicon glyphicon-plus-sign"></span> to create a new composition</li>
						</ul>
					</div>
				</div>
			)
		}

	});

	return Tutorial;
});