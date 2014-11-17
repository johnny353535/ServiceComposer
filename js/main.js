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

    var init = function(data) {

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
    };

    $.getJSON("data.json").done(init);

});