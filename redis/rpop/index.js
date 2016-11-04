var redis = require("redis");

function myAction(params) {

    var key = params.key || "";
    console.log("RPOP " + key);

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
//    client.on("error", function(err) {
//        console.log("Error: " + err);
//        whisk.error("Error: " + err);
//    });

    return new Promise(function(resolve, reject) {
        client.send_command("RPOP", [key], function(err, reply) {
            client.quit();
            console.log("RPOP is: " + reply);
            resolve({ key: key });
        });
    });
}

exports.main = myAction;
