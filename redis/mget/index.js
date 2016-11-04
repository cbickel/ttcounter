var redis = require("redis");

function myAction(params) {

    var keys = params.keys || [];
    console.log(keys);

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
//    client.on("error", function(err) {
//        console.log("Error: " + err);
//        whisk.error("Error: " + err);
//    });

    return new Promise(function(resolve, reject) {
        client.mget(keys, function(err, reply) {
            client.quit();
            console.log("MGET is: " + reply);
            var result = {};
            keys.forEach(function(current, index) {
              result[current] = reply[index];
            });
            resolve({ payload: result });
        });
    });
}

exports.main = myAction;
