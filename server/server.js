"use strict";

var activities = require('../data/activities.json');
var fragments = require('../data/fragments.json');

var underscore = require('underscore');
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/bpmn', function (req, res) {

  var json = JSON.parse(req.body.json);

	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  res.set('Content-Type', 'text/xml');
  res.send(JSONtoXML(json));
})

// Deliver activities
app.get('/activities', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  res.set('Content-Type', 'text/json');
  res.send(activities);

})

// Deliver fragments
app.get('/fragments', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  res.set('Content-Type', 'text/json');
  res.send(fragments);

})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server listening at http://%s:%s', host, port)

})

//JSONtoXML(flow);

function JSONtoXML(json){

  var flow = json.flow;

  var xml = '<?xml version="1.0" encoding="UTF-8">\n';
  var definitions = '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">\n';
  var process = '<process id="'+json.uid+'" name="'+json.name+'" isExecutable="true">\n';

	var elements = "";
  var dataObjects = "";
	var sequence = "";

	elements += '<startEvent id="startevent" name="Start"></startEvent>\n';
  elements += collectElements(flow);
	elements += '<endEvent id="endevent" name="End"></endEvent>\n';

  dataObjects = collectDataObjects(flow);

  sequence += '<sequenceFlow id="flow'+Math.random()+'" sourceRef="startevent" targetRef="'+flow[0].uid+'"></sequenceFlow>\n';
  sequence += exploreFlowSequence(flow);
	sequence += '<sequenceFlow id="flow'+Math.random()+'" sourceRef="'+flow[flow.length - 1].uid+'" targetRef="endevent"></sequenceFlow>\n';

	//console.log(sequence)

  // Build the BPMN

  var bpmn =
        xml + '\n'+
        definitions +
        process + '\n' +
        elements + '\n' +
        dataObjects + '\n' +
        sequence + '\n' +
        '</process>\n' +
        '</definitions>';

  //console.log('JSON:', json);
  //console.log('BPMN:', bpmn);

  return bpmn;

}

// Collect data objects
function collectDataObjects(flow){
  var dataObjects = '';

  for(var i=0; i<flow.length; i++){

    var elem = flow[i];

    if(elem.outputArguments){
      var outputArguments = elem.outputArguments;
      var imputArguments = elem.inputArguments;

      for(var k=0; k<outputArguments; k++){
        var argument = outputArguments[k];
        dataObjects += '<dataObject id="'+Math.random()+'" name="'+argument.name+'" itemSubjectRef="xsd:'+argument.type+'"/>\n';
      }

      /*
      for(var i=0; i<inputArguments; i++){
        var argument = inputArguments[i]
        dataObjects += '<dataObject id="'+Math.random()+'" name="'+argument.name+'" itemSubjectRef="xsd:'+argument.type+'"/>';
      }
      */
    }

    // Any subflows?
    if(flow[i].flows){
      var flows = flow[i].flows;
      // recursively call collectDataObjects on subflows
      for(var j = 0; j < flows.length; j++){
        var subflow = flow[i].flows[j].flow;
        dataObjects += collectDataObjects(subflow)
      }
    }

  }

  return dataObjects;
}


// Recursive function that searches for elements in flows and subflows
function collectElements(flow){
  var elements = '';

  // Collect elements
  for(var i = 0; i < flow.length; i++){

    var elem = flow[i];

    // Append element
    switch(elem.type){
      case "activity":
        elements += '<serviceTask id="'+elem.uid+'" name="'+elem.name+'">'
        elements += elem.description ? '<documentation>'+elem.description+'</documentation>':'';
        elements += '</serviceTask>\n';

        break;
      case "fragment":

        // Differentiate between different fragment types

        switch(elem.fragmentType){
          case "conditional":
            elements += '<exclusiveGateway id="'+elem.uid+'" name="'+elem.name+'">'
            elements += elem.description ? '<documentation>'+elem.description+'</documentation>':'';
            elements += '</exclusiveGateway>\n';
            elements += '<exclusiveGateway id="'+elem.uid+'closing'+'" name="'+elem.name+'"></exclusiveGateway>\n';
            break;
          case "parallel":
            elements += 'parallelGateway id="'+elem.uid+'" name="'+elem.name+'">'
            elements += elem.description ? '<documentation>'+elem.description+'</documentation>':'';
            elements += '</parallelGateway>\n';
            elements += 'parallelGateway id="'+elem.uid+'closing'+'" name="'+elem.name+'"></parallelGateway>\n';
            break;
          case "loop":
            elements += '<exclusiveGateway id="'+elem.uid+'" name="'+elem.name+'">';
            elements += elem.description ? '<documentation>'+elem.description+'</documentation>':'';
            elements += '</exclusiveGateway>\n';
            elements += '<exclusiveGateway id="'+elem.uid+'closing'+'" name="'+elem.name+'"></exclusiveGateway>\n';
            break;
          default:
            console.log("Didn't recognize fragment type.");
            break;
        }

        break;
    }

    // Any subflows?
    if(flow[i].flows){
      var flows = flow[i].flows;
      // recursively call collectElements on subflows
      for(var j = 0; j < flows.length; j++){
        var subflow = flow[i].flows[j].flow;
        elements += collectElements(subflow)
      }
    }
  }

  return elements;
}

function exploreFlowSequence(flow){
  var sequence = '';

  // Iterate through flow
	for(var i = 0; i < flow.length; i++){

		var elem = flow[i];
		var nextElem = flow[i + 1];

    // Write sequence
		if(elem.type === "activity"){

      if(nextElem){
        sequence += '<sequenceFlow id="flow'+Math.random()+'" sourceRef="'+elem.uid+'" targetRef="'+nextElem.uid+'"></sequenceFlow>\n';
      }

    } else if(elem.type === "fragment"){

      if(nextElem){
        // Connect closing tag of fragment
        sequence += '<sequenceFlow id="flow'+Math.random()+'" sourceRef="'+elem.uid+'_closing" targetRef="'+nextElem.uid+'"></sequenceFlow>\n'
      }

      if(elem.flows){
        var flows = flow[i].flows;
        // recursively call exploreFlowSequence on subflows
        for(var j = 0; j < flows.length; j++){
          var subflow = flow[i].flows[j].flow;
          var firstSubflowElem = subflow[0];
          var lastSubflowElem = subflow[subflow.length-1];

          // Connect fragment to first subflow element
          sequence += '<sequenceFlow id="'+Math.random()+'" sourceRef="'+elem.uid+'" targetRef="'+firstSubflowElem.uid+'"></sequenceFlow>\n'
          // Insert subflow elements
          sequence += exploreFlowSequence(subflow);
          // Connect last subflow element to closing element of fragment
          sequence += '<sequenceFlow id="'+Math.random()+'" sourceRef="'+lastSubflowElem.uid+'" targetRef="'+elem.uid+'_closing'+'"></sequenceFlow>\n'
        }
      }

    }
	}

  return sequence
}
