var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var namespace = 'cbickel@de.ibm.com_dev';
var triggerUrl = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/' + namespace + '/triggers/';
var auth = '';
var triggers = [
  {
    title: 'P1',
    trigger: 'point',
    payload: {payload: {p1: null}}
  },
  {
    title: 'P2',
    trigger: 'point',
    payload: {payload: {p2: null}}
  },
  {
    title: 'Refresh',
    trigger: 'refreshScore'
  },
  {
    title: 'Back',
    trigger: 'back'
  },
  {
    title: 'Reset',
    trigger: 'reset'
  }
];

var main = new UI.Menu({
  sections: [{
    items: triggers
  }]
});

function processResponse(res, code, e, start) {
  var duration = Date.getTime() - start;
  console.log('Request took ' + duration + ' with res: ' + code + ' ' + JSON.stringify(res));
  var itemWithCode = e;
  itemWithCode.subtitle = duration + ': ' + code;
  main.item(e.sectionIndex, e.itemIndex, itemWithCode);
  Vibe.vibrate();
}

main.on('select', function(e) {
  var payload = e.item.payload || {};
  var start = Date.getTime();
  console.log("Making request: " + start);
  ajax(
    {
      url: triggerUrl + e.item.trigger,
      method: 'POST',
      type: 'json',
      data: payload,
      headers: { Authorization: 'Basic ' + auth }
    },
    function(res, code){ processResponse(res, code, e, start); },
    function(res, code){ processResponse(res, code, e, start); }
  );
});

main.show();
