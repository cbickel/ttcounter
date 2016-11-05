var openwhisk = require('openwhisk');

function myAction(params) {
    var ow = openwhisk({
        api: 'https://openwhisk.ng.bluemix.net/api/v1/',
        api_key: params.apiKey,
        namespace: 'cbickel@de.ibm.com_dev'
    });
    var payload = params.payload || {};

    var trigger = false;
    for (var key in payload){
        trigger = trigger || parseInt(payload[key]) >= 11;
    }

    if (trigger) {
        return ow.triggers.invoke({ triggerName: "afterSet" });
    } else {
        return { payload: payload };
    }
}

exports.main = myAction;
