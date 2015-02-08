define(["react"], function(React) {

	'use strict';

	var Tutorial = React.createClass({
		render: function(){

			return(
				<div className="tutorial">
					<div className="help">
						<h4>Getting started</h4>
						<ul>
							<li>Tap <span className="glyphicon glyphicon-book"></span> to load a composition - or -</li>
							<li>Tap <span className="glyphicon glyphicon-plus-sign"></span> to create a new composition</li>
						</ul>
						<h4>Help</h4>
						<p>A service composition defines a sequence of operations that shall be automized.</p>
						<p>There are three times of elements in a service composition: activities, fragments and compositions.</p>
						<p>Tap <span className="glyphicon glyphicon-book"></span> to reopen this help any time.</p>
					</div>
				</div>
			)
		}

	});

	return Tutorial;
});
