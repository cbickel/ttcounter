var openwhisk = require('openwhisk');

function afterSetHandling(params) {
    var ow = openwhisk({
        api: 'https://openwhisk.ng.bluemix.net/api/v1/',
        api_key: params.apiKey,
        namespace: 'cbickel@de.ibm.com_dev'
    });

    if (!isSetFinished(params.payload)) {
        // Set is not finished
        return {
            key: "backup",
            value: JSON.stringify(params.payload)
        };
    } else {
        // Set is finished -> Update scores
        // decrBy p1 payload.p1
        var decr1 = ow.actions.invoke({
            actionName: "myRedis/decrBy",
            params: {
                key: "p1",
                value: params.payload.p1
            },
            blocking: false
        });
        // decrBy p2 payload.p2
        var decr2 = ow.actions.invoke({
            actionName: "myRedis/decrBy",
            params: {
                key: "p2",
                value: params.payload.p2
            },
            blocking: false
        });
        // incr pXset
        var incrSet  = ow.actions.invoke({
            actionName: "myRedis/incr",
            params: {
                key: parseInt(params.payload.p1) > parseInt(params.payload.p2) ? "p1set" : "p2set"
            },
            blocking: false
        });

        return Promise.all([decr1, decr2, incrSet]).then(function() {
            return {
                key: "backup",
                value: JSON.stringify(params.payload)
            };
        });
    }
}

function isSetFinished(payload) {
    return (payload.p1 >= 11 && payload.p1 - payload.p2 >= 2) || (payload.p2 >= 11 && payload.p2 - payload.p1 >= 2);
}

exports.main = afterSetHandling;
