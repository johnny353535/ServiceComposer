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

	var components = "";
	var sequence = "";

	components += '<startEvent id="startevent1" name="Start"></startEvent>\n';
	sequence += '<sequenceFlow id="flow1" sourceRef="startevent" targetRef="'+flow[0].uid+'"></sequenceFlow>\n';

	for(var i = 0; i < flow.length; i++){
		var elem = flow[i];
		var nextElem = flow[i + 1];

		components += "";
		if(i < flow.length - 1) sequence += '<sequenceFlow id=\"flow'+(i+2)+'\" sourceRef=\"'+elem.uid+'\" targetRef=\"'+nextElem.uid+'\"></sequenceFlow>\n'

	}

	components += '<endEvent id="endevent1" name="End"></endEvent>';
	sequence += '<sequenceFlow id="flow'+(flow.length + 1)+'" sourceRef="'+flow[flow.length - 1].uid+'" targetRef="endevent1"></sequenceFlow>\n';

	//console.log(sequence)

  var bpmn = (components + '\n\n' + sequence);

  console.log('JSON:', json);
  console.log('BPMN:', bpmn);

  return bpmn;

}