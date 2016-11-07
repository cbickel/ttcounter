var redis = require("redis");

function myAction(params) {
    var payload = params.payload || {};
    console.log("Input: " + JSON.stringify(payload));

    var keysAndValues = [];
    for (var key in payload) {
        keysAndValues.push(key);
        keysAndValues.push(payload[key]);
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

        console.log([keysAndValues[0], keysAndValues[1]]);
        client.send_command("RPUSH", [keysAndValues[0], keysAndValues[1]], function(err, reply) {
            client.quit();
            console.log(err);
            console.log("RPUSH got: " + reply);

            console.log("Return: " + JSON.stringify(payload));
            resolve({ payload: payload });
        });
    });
}

exports.main = myAction;
