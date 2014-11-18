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
        plugins: 'plugins'
    },
    packages: [

    ]
});


require(["react", "components/FlowWrapper", "components/AddComponentWrapper", "components/MainHeader", "jquery", "html5shiv", "respond", "plugins", "bootstrap"], function (React, FlowWrapper, AddComponentWrapper, MainHeader) {

    React.initializeTouchEvents(true);

    var init = function(data) {
        React.render(
          <div id="mainWrapper">
            <MainHeader />
            <div id="contentWrapper" className="contentWrapper">
              <FlowWrapper data={data} />
              <AddComponentWrapper />
            </div>
          </div>,
          document.body
        );
    };

    $.getJSON("data.json").done(init);

});