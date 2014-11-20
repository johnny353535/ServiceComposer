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

    var init = function(example_data, activities) {

        var example_data = example_data[0];
        example_data = {
            "metadata": null,
            "flow": {
              "id": "7c9n58qn75q",
              "name": "mainFlow",
              "flow": []
            }
        };

        var activities = activities[0];

        // React.render(
        //   <div id="mainWrapper">
        //     <MainHeader />
        //     <div id="contentWrapper" className="contentWrapper">
        //       <MainFlow data={example_data} />
        //       <AddElementWrapper data={activities} />
        //     </div>
        //   </div>,
        //   document.body
        // );

        React.render(
            <MainFlow data={example_data} activities={activities} />,
            document.body
        );
    };

    var url_exampleData = "exampleData.json";
    var url_acitvites = "activities.json";

    $.when($.getJSON(url_exampleData), $.getJSON(url_acitvites)).done(init);

});