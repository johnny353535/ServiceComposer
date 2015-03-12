define(["react"], function(React) {

	'use strict';

	var Tutorial = React.createClass({
		render: function(){

			return(
				<div className="tutorial">
					<div className="help">
						<h4>Quick start</h4>
						<ul>
							<li>Tap <span className="glyphicon glyphicon-book"></span> to load a composition</li>
							<li>Tap <span className="glyphicon glyphicon-plus-sign"></span> to create a new composition</li>
						</ul>

						<h4>Configuring and deleting elements</h4>
						<p>Tap <span className="glyphicon glyphicon-cog"></span> to configure and <span className="glyphicon glyphicon-trash"></span> to delete an element.</p>

						<h4>Publishing your Service Composition</h4>
						<p>Tap <span className="glyphicon glyphicon-share"></span> to export your Service Composition to BPMN</p>

						<p>Tap <span className="glyphicon glyphicon-question-sign"></span> to reopen this help any time.</p>

						<h4>Terminology</h4>
						<p>A service composition defines a sequence of operations that shall be automized.</p>
						<p>There are two types of elements in a service composition: activities and fragments.</p>

						<p><b>Activities</b> are remote services that either provide data or provide an action. These can be either physical devices or Internet services.</p>
						<p><b>Fragments</b> are for instance conditional elements, which execute certain activities based on certain preconditions. This could be based on a weather situation, date or time, a reading by a sensor and so on. Parallel fragments execute multiple activities at the same time.</p>

					</div>
				</div>
			)
		}

	});

	return Tutorial;
});
