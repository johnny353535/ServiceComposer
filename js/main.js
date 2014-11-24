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
        react: '../bower_components/react/react-with-addons',
        underscore: '../bower_components/underscore/underscore',
        flux: "../bower_components/flux/dist/Flux",
        plugins: 'plugins'
    },
    packages: [

    ]
});


require(["react", "components/MainFlow", "components/AddElementWrapper", "components/MainHeader", "flux", "jquery", "html5shiv", "respond", "plugins", "bootstrap"], function (React, MainFlow, AddElementWrapper, MainHeader, Flux) {

    React.initializeTouchEvents(true);

    window.uiDispatcher = new Flux.Dispatcher();


    var init = function(activities, fragments) {

        var initialData = {
            "uid": window.guid(),
            "name": "myFlow",
            "flow": []
        }

        React.render(
          <MainFlow data={initialData} activities={activities} fragments={fragments} />,
          document.body
        );

    };


    var url_activities = "data/activities.json";
    var url_fragments = "data/fragments.json";

    $.when(
        $.getJSON(url_activities),
        $.getJSON(url_fragments)
    ).done(function(activities, fragments) {
        init(activities[0], fragments[0]);
    });

});