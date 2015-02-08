define(["flux"], function(Flux) {

	'use strict';

	var AppDispatcher = new Flux.Dispatcher();

	AppDispatcher.register(function(payload){
		//console.info("event", payload)
	});

    return AppDispatcher;

});
