var redis = require("redis");

function myAction(params) {

    var key = params.key || "";
    var value = params.value || "";
    console.log("RPUSH " + key + " to " + value);

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
//    client.on("error", function(err) {
//        console.log("Error: " + err);
//        whisk.error("Error: " + err);
//    });

    return new Promise(function(resolve, reject) {
        client.send_command("RPUSH", [key, value], function(err, reply) {
            client.quit();
            console.log("RPUSH is: " + reply);
            resolve({ key: key });
        });
    });
}

exports.main = myAction;
