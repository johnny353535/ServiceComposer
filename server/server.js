var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/bpmn', function (req, res) {

	console.log(req.body);

	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  	res.set('Content-Type', 'text/xml');
	res.send('<test>Hallo</test>');
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server listening at http://%s:%s', host, port)

})



var json = {
  "uid": 1421159066349,
  "name": "MyFlow",
  "type": "flow",
  "glyphicon": "glyphicon-asterisk",
  "description": "kein text",
  "flow": [
    {
      "id": "aj9d0ajsd09a",
      "name": "Light",
      "description": "Control the light",
      "glyphicon": "glyphicon-certificate",
      "url": "",
      "type": "activity",
      "uid": 1421159069803
    },
    {
      "id": "akspoda0s9d2",
      "name": "Door",
      "description": "Lock and unlock the door",
      "glyphicon": "glyphicon-home",
      "url": "",
      "type": "activity",
      "uid": 1421159072351
    },
    {
      "id": "weather",
      "type": "fragment",
      "fragmentType": "conditional",
      "name": "Weather",
      "description": "Reacts based on the weather condition",
      "glyphicon": "glyphicon-cloud",
      "sentence": "If the weather is",
      "options": [
        {
          "name": "sunny",
          "glyphicon": "glyphicon-certificate"
        },
        {
          "name": "cloudy",
          "glyphicon": "glyphicon-cloud"
        },
        {
          "name": "rainy",
          "glyphicon": "glyphicon-tint"
        },
        {
          "name": "windy",
          "glyphicon": "glyphicon-flag"
        }
      ],
      "flows": [
        {
          "uid": 1421159076741,
          "name": "sunny",
          "type": "flow",
          "glyphicon": "glyphicon-certificate",
          "description": "kein text",
          "flow": [
            {
              "id": "as0kd9a9d",
              "name": "Play music",
              "description": "Play a song or playlist",
              "glyphicon": "glyphicon-music",
              "url": "",
              "type": "activity",
              "uid": 1421159082233
            }
          ]
        },
        {
          "uid": 1421171683601,
          "name": "rainy",
          "type": "flow",
          "glyphicon": "glyphicon-tint",
          "description": "kein text",
          "flow": []
        }
      ],
      "uid": 1421159074938
    }
  ]
}

var flow = json.flow;
//JSONtoXML(flow);

function JSONtoXML(json){


	var bpmn = "";
	var sequence = "";

	bpmn += '<startEvent id="startevent1" name="Start"></startEvent>\n';
	sequence += '<sequenceFlow id="flow1" sourceRef="startevent" targetRef="'+flow[0].uid+'"></sequenceFlow>\n';

	for(var i = 0; i < flow.length; i++){
		var elem = flow[i];
		var nextElem = flow[i + 1];

		bpmn += "";
		if(i < flow.length - 1) sequence += '<sequenceFlow id=\"flow'+(i+2)+'\" sourceRef=\"'+elem.uid+'\" targetRef=\"'+nextElem.uid+'\"></sequenceFlow>\n'

	}

	bpmn += '<endEvent id="endevent1" name="End"></endEvent>';
	sequence += '<sequenceFlow id="flow'+(flow.length + 1)+'" sourceRef="'+flow[flow.length - 1].uid+'" targetRef="endevent1"></sequenceFlow>';

	//console.log(sequence)

}