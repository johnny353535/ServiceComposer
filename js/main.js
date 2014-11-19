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


require(["react", "components/FlowWrapper", "components/AddElementWrapper", "components/MainHeader", "jquery", "html5shiv", "respond", "plugins", "bootstrap"], function (React, FlowWrapper, AddElementWrapper, MainHeader) {

    React.initializeTouchEvents(true);

    // var init = function(data) {
    //     React.render(
    //       <div id="mainWrapper">
    //         <MainHeader />
    //         <div id="contentWrapper" className="contentWrapper">
    //           <FlowWrapper root="true" key={data.id} data={data} />
    //           <AddElementWrapper />
    //         </div>
    //       </div>,
    //       document.body
    //     );
    // };

    var init = function(data) {
        React.render(
            <FlowWrapper root="true" key={data.id} data={data} />,
            document.body
        );
    };

    $.getJSON("data.json").done(init);

});