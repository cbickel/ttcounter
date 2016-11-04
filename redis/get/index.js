var redis = require("redis");

function myAction(params) {

    var key = params.key || "";

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
//    client.on("error", function(err) {
//        console.log("Error: " + err);
//        whisk.error("Error: " + err);
//    });

    return new Promise(function(resolve, reject) {
        client.get(key, function(err, reply) {
            client.quit();
            console.log("Increased to: " + reply);
            resolve({ payload: { [key]: reply } });
        });
    });
}

exports.main = myAction;
