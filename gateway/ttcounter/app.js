/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Whisk Gateway
var bodyParser = require('body-parser');
var request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.post('/point', function(req, res, next){
    console.log('/point' + req.body);
    wskInvoke('point', req.body);
    res.end(req.body.key);
});
app.post('/refreshScore', function(req, res, next){
    console.log('/refreshScore');
    wskInvoke('refreshScore', {});
    res.end(req.body.key);
});
app.post('/reset', function(req, res, next){
    console.log('/reset' + req.body);
    wskInvoke('reset', {});
    res.end(req.body.key);
});
function wskInvoke(name, body) {
    request({
        method: 'POST',
        uri: 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/cbickel@de.ibm.com_dev/actions/ttcounter/' + name + '?blocking=false',
        auth: {
            user: "",
            pass: ""
        },
        json: body
    });
}

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
