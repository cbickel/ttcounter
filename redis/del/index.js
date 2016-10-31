var redis = require("redis");

function myAction(params) {

    var key = params.key || "";

    var client = redis.createClient(params.port, params.host);
    client.auth(params.password);
    client.on("error", function(err) {
        console.log("Error: " + err);
        whisk.error("Error: " + err);
    });
    client.set("message", "Hello, world!");

//    client.get("message", function(err, reply) {
//        client.quit();
//        console.log("Fetched Message: " + reply);
//        whisk.done({result: reply});
//    });

    return new Promise(function(resolve, reject) {
        client.del(key, function(err, reply) {
            client.quit();
            console.log("Deleted: " + reply);
            resolve({ message: reply });
        });
    });

//    return whisk.async();
}

exports.main = myAction;
