var redis = require("redis");

function myAction(params) {

    var keyValues = params.keyValues || [];
    console.log("MSET " + keyValues);

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
//    client.on("error", function(err) {
//        console.log("Error: " + err);
//        whisk.error("Error: " + err);
//    });

    return new Promise(function(resolve, reject) {
        client.send_command("MSET", keyValues, function(err, reply) {
            client.quit();
            console.log("MSET is: " + reply);
            resolve({ payload: reply });
        });
    });
}

exports.main = myAction;
