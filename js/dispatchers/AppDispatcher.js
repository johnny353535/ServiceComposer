define(["flux"], function(Flux) {

	var AppDispatcher = new Flux.Dispatcher();

	AppDispatcher.register(function(payload){
		//console.info("event", payload)
	});

    return AppDispatcher;

})