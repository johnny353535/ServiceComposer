'use strict';

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
        minivents: '../bower_components/minivents-cuzzo/minivents.min'
    },
    packages: [

    ]
});


require(["react", "components/Main.react", "flux", "jquery", "bootstrap", "minivents"], function (React, Main, Flux) {

    React.initializeTouchEvents(true)

    React.render(
      <Main />,
      document.body
    );


});
