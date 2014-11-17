requirejs.config({
	shim: {
        "bootstrap": {
          deps: ["jquery"],
          exports: "$.fn.popover"
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        html5shiv: '../bower_components/html5shiv/dist/html5shiv',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        respond: '../bower_components/respond/dest/respond.src',
        react: '../bower_components/react/react',
        plugins: 'plugins'
    },
    packages: [

    ]
});


require(["react", "jquery", "html5shiv", "respond", "plugins", "bootstrap"], function (React) {

    React.initializeTouchEvents(true);

    var data = {
        test: "test",
        flow: [
            {
                type: "activity", name: "test12", description: "description"
            },
            {
                type: "fragment",
                fragmentType: "conditional",
                name: "conditional!",
                condition: "x > 41",
                description: "this is a description",
                flows: [
                    {
                        name: "true",
                        flow: [
                            {type: "activity", name: "test3"},
                            {type: "activity", name: "test4", description: "description1"}
                        ]
                    },
                    {
                        name: "false",
                        flow: [
                            {type: "activity", name: "test32"},
                            {type: "activity", name: "test48"},
                        ]
                    }
                ]
            },
            {
                type: "fragment",
                fragmentType: "parallel",
                name: "parallel!",
                description: "this is a description",
                flows: [
                    {
                        name: "Hey",
                        flow: [
                            {type: "activity", name: "test3"},
                            {type: "activity", name: "test4", description: "description1"}
                        ]
                    },
                    {
                        name: "You",
                        flow: [
                            {type: "activity", name: "test32"},
                            {type: "activity", name: "test48"},
                        ]
                    },
                    {
                        name: "Me",
                        flow: [
                            {type: "activity", name: "test2"},
                            {type: "activity", name: "test408"},
                        ]
                    }
                ]
            },
            {
                type: "fragment",
                fragmentType: "loop",
                name: "loop!",
                description: "this is a description",
                condition: "y < 3",
                flows: [
                    {
                        name: "Hey",
                        flow: [
                            {type: "activity", name: "test3"},
                            {type: "activity", name: "test4", description: "description1"}
                        ]
                    },
                    {
                        name: "You",
                        flow: [
                            {type: "activity", name: "test32"},
                            {type: "activity", name: "test48"},
                        ]
                    },
                    {
                        name: "Me",
                        flow: [
                            {type: "activity", name: "test2"},
                            {type: "activity", name: "test408"},
                        ]
                    }
                ]
            }
        ]
    }


    var FlowWrapper = React.createClass({
        addElement: function(){
            alert('addElement');
        },
        deleteElement: function(){
            window.confirm("Are you sure you want to remove this fragment?") ? alert("true") : alert("false");
        },
      render: function() {

        var flowElementNodes = this.props.data.flow.map(function (flowElement) {

            switch(flowElement.type){
                case "activity":
                    return (
                      <li><Activity data={flowElement}></Activity></li>
                    );
                case "fragment":
                    return (
                      <li><Fragment data={flowElement}></Fragment></li>
                    );
                    break;
                default:
                    // do nufin
            }
        });

        return (
          <div className="flowWrapper">
              <ul>
                {flowElementNodes}
              </ul>
              <div className="flowControl panel panel-default" onClick={this.addElement}><span className="glyphicon glyphicon-plus"></span></div>
          </div>
        );
      }
    });

    var Activity = React.createClass({
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

    var Fragment = React.createClass({
      render: function() {

        var first = true;
        var fragmentTabNav = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            return (
              <li role="presentation" className={className}>
                <a href={"#"+flow.name} role="tab" data-toggle="tab">{flow.name} <span className="badge">{flow.flow.length}</span></a>
              </li>
            );
        });

        first = true;
        var fragmentTabContents = this.props.data.flows.map(function (flow) {

            var className = first ? "active" : "";
            first = false;

            return (
                <li role="tabpanel" className={"tab-pane "+className} id={flow.name}><FlowWrapper data={flow} /></li>
            );
        });

        var className = "";
        var glyphicon = "";

        switch (this.props.data.fragmentType){
            case "conditional":
                className = "panel-success fragment-conditional";
                glyphicon = "glyphicon-question-sign";
                break;
            case "parallel":
                className = "panel-warning fragment-parallel";
                glyphicon = "glyphicon-pause";
                break;
            case "loop":
                className = "panel-info fragment-loop";
                glyphicon = "glyphicon-retweet";
                break;
            default:
                className = "panel-default";
        }

        return (
          <div className={"flowElement fragment panel "+className}>
            <div className="panel-heading">
                <span className={"glyphicon "+glyphicon}></span>
                <h3 className="panel-title">{this.props.data.name}</h3>
                <span className="glyphicon glyphicon-trash button-delete" onClick={this.delete}></span>
            </div>
            <div className="condition condition-top"><span>{this.props.data.condition}</span></div>
            <div className="panel-body">
                <div>{this.props.data.description}</div>
            </div>
            <div className="fragmentWrapper">
                {/*Tab navigation*/}
                <ul className="nav nav-tabs mobile-nav-tabs" role="tablist">
                    {fragmentTabNav}
                </ul>
                {/* Tab contents */}
                <ul className="tab-content mobile-nav-content">
                    {fragmentTabContents}
                </ul>
            </div>
            <div className="condition condition-bottom"><span>{this.props.data.condition}</span></div>
        </div>
        );
      }
    });


    React.render(
      <FlowWrapper data={data} />,
      document.getElementById('contentWrapper')
    );

    $('.addComponentWrapper').height($('body').height() - $('.flowWrapper:first-child li:first-child').offset().top);

	$('#addComponentButton').click(function(){
		$(this).toggleClass('active');
		$('.addComponentWrapper').toggleClass('active');
		$('.contentWrapper').toggleClass('dim');
		$('.flowWrapper').toggleClass('inactive');
	});

});