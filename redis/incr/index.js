var redis = require("redis");

function myAction(params) {
    var payload = params.payload || {};
    console.log("Input: " + JSON.stringify(payload));

    var keys = [];
    for (var key in payload) {
        keys.push(key);
    }

    var client = redis.createClient(params.port, params.host);
    if (params.password) {
        client.auth(params.password);
    }

    return new Promise(function(resolve, reject) {
        client.on("error", function(err) {
            console.log("Error: " + err);
            reject({
                error: err
            });
        });

        client.incr(keys[0], function(err, reply) {
            client.quit();
            console.log("INCR got: " + reply);

            payload[keys[0]] = reply;
            console.log("Return: " + JSON.stringify(payload));

            resolve({
                payload: payload
            });
        });
    });
}

exports.main = myAction;
