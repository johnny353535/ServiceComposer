var activities = require('../data/activities.json');
var fragments = require('../data/fragments.json');

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

  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  var definitions = '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">\n';
  var process = '<process id="'+json.uid+'" name="'+json.name+'" isExecutable="true">\n';

	var elements = "";
	var sequence = "";

	elements += '<startEvent id="startevent1" name="Start"></startEvent>\n';
  elements += collectElements(flow);
	elements += '<endEvent id="endevent1" name="End"></endEvent>\n';

  sequence += '<sequenceFlow id="flow1" sourceRef="startevent" targetRef="'+flow[0].uid+'"></sequenceFlow>\n';
  sequence += exploreFlowSequence(flow);
	sequence += '<sequenceFlow id="flow'+(flow.length + 1)+'" sourceRef="'+flow[flow.length - 1].uid+'" targetRef="endevent1"></sequenceFlow>\n';

	//console.log(sequence)

  // Build the BPMN

  var bpmn =
        xml + '\n'+
        definitions +
        process + '\n' +
        elements + '\n' +
        sequence + '\n' +
        '</process>\n' +
        '</definitions>';

  //console.log('JSON:', json);
  //console.log('BPMN:', bpmn);

  return bpmn;

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
        elements += '<serviceTask id="'+elem.id+'" name="'+elem.name+'"></serviceTask>\n';
        break;
      case "fragment":
        elements += '<exclusiveGateway id="'+elem.id+'" name="'+elem.name+'"></exclusiveGateway>\n';
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
		if(nextElem){
      sequence += '<sequenceFlow id=\"flow'+(i+2)+'\" sourceRef=\"'+elem.uid+'\" targetRef=\"'+nextElem.uid+'\"></sequenceFlow>\n'
    }

    // Any subflows?
    if(flow[i].flows){
      var flows = flow[i].flows;
      // recursively call exploreFlowSequence on subflows
      for(var j = 0; j < flows.length; j++){
        var subflow = flow[i].flows[j].flow;
        sequence += exploreFlowSequence(subflow)
      }
    }
	}

  return sequence
}
