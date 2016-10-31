var openwhisk = require('openwhisk');

var ow = openwhisk({api: 'https://openwhisk.ng.bluemix.net/api/v1/', api_key: params.apiKey, namespace: 'cbickel@de.ibm.com_dev'});

function point(params) {
    var incrPromise = redis(params.player, "incr", true);

    return incrPromise.then(function(activation) {
        var result = activation.response.result;
        var newValue = result.message;
        if (newValue < 11) {
            return { message: newValue };
        } else {
            // Satz erhöhen
            redis(params.player + "set", "incr", false).then(function() {
                redis("p1", "del", false);
            }).then(function() {
                redis("p2", "del", false);
            }).then(function() {
                return { message: newValue };
            });
        }
        return { message: result };
    });
}

function redis(key, command, blocking) {
    return ow.actions.invoke({
        actionName: "myRedis/" + command,
        params: {
            key: key
        },
        blocking: blocking
    });
}

exports.main = point;
