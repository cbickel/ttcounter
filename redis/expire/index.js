var redis = require("redis");

function myAction(params) {

    var key = params.key || "";
    var seconds = params.seconds || 300;
    console.log("EXPIRE:  " + key + " in: " + seconds);

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
//    client.on("error", function(err) {
//        console.log("Error: " + err);
//        whisk.error("Error: " + err);
//    });

    return new Promise(function(resolve, reject) {
        client.send_command("EXPIRE", [key, seconds], function(err, reply) {
            client.quit();
            console.log("EXPIRE is: " + reply);
            resolve({ payload: reply });
        });
    });
}

exports.main = myAction;
