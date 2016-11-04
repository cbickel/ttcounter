var redis = require("redis");

function myAction(params) {

    var key = params.key || "";
    var value = params.value || 0;
    console.log("Decr " + key + " by " + value);

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
//    client.on("error", function(err) {
//        console.log("Error: " + err);
//        whisk.error("Error: " + err);
//    });

    return new Promise(function(resolve, reject) {
        client.send_command("DECRBY", [key, value], function(err, reply) {
            client.quit();
            console.log("DecrBy is: " + reply);
            resolve({ payload: reply });
        });
    });
}

exports.main = myAction;
