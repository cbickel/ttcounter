var Client = require('ibmiotf');

function myAction(params) {
    var payload = params.payload || {};
    console.log("Input: " + JSON.stringify(payload));

    var config = {
        "org": params.org,
        "id": params.id,
        "type": params.type,
        "auth-method": params.authMethod,
        "auth-token": params.authToken
    };
    var deviceClient = new Client.IotfDevice(config);

    deviceClient.connect();
    deviceClient.log.setLevel('trace');

    return new Promise(function(resolve, reject) {
        deviceClient.on("connect", function() {
            //publishing event using the default quality of service
            deviceClient.publish("score", "json", params.payload);

            deviceClient.disconnect();
            console.log("Return: " + JSON.stringify(payload));
            resolve({
                payload: payload
            });
        });
    });
}

exports.main = myAction;
