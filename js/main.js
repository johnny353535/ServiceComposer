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


require(["react", "components/FlowWrapper", "jquery", "html5shiv", "respond", "plugins", "bootstrap"], function (React, FlowWrapper) {

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