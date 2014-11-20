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
        plugins: 'plugins'
    },
    packages: [

    ]
});


require(["react", "components/MainFlow", "components/AddElementWrapper", "components/MainHeader", "jquery", "html5shiv", "respond", "plugins", "bootstrap"], function (React, MainFlow, AddElementWrapper, MainHeader) {

    React.initializeTouchEvents(true);

    var init = function(activities) {

        var activities = activities;

        React.render(
          <div id="mainWrapper" className="mainWrapper">
            <MainHeader />
            <MainFlow activities={activities}/>
          </div>,
          document.body
        );

    };

    var url_acitvites = "activities.json";

    $.getJSON(url_acitvites, init);

});