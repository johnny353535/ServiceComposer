requirejs.config({
	shim: {
        "bootstrap": {
          deps: ["jquery"],
          exports: "$.fn.popover"
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        react: '../bower_components/react/react-with-addons',
        underscore: '../bower_components/underscore/underscore',
        flux: "../bower_components/flux/dist/Flux",
        minivents: '../bower_components/minivents-cuzzo/minivents.min',
        plugins: 'plugins'
    },
    packages: [
 
    ]
});


require(["react", "components/MainFlow.react", "components/AddElementWrapper.react", "components/MainHeader.react", "flux", "jquery", "plugins", "bootstrap", "minivents"], function (React, MainFlow, AddElementWrapper, MainHeader, Flux) {

    React.initializeTouchEvents(true)


    var init = function(activities, fragments) {

        React.render(
          <MainFlow activities={activities} fragments={fragments} />,
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