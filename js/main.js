$(document).ready(function(){
    // Insert names from Query-Parameters
    var queryParameters = window.location.search.substring(1).split("&");
    queryParameters.forEach(function(parameter) {
      var keyValue = parameter.split("=");
      switch(keyValue[0]) {
        case "p1":
          $("#namePlayer1").text(keyValue[1]);
          break;
        case "p2":
          $("#namePlayer2").text(keyValue[1]);
          break;
      }
    });

    //IotfDevice
    var config = {
      "org" : "gm7xvu",
      "type" : "Browser",
      "id" : "browser" + parseInt(Math.random() * 8192),
      "auth-key" : "a-gm7xvu-unqt2bj20h",
      "auth-token" : "8oMm9wLB0vyWNjtuH!"
    };
    var appClient = new IBMIoTF.IotfApplication(config);
    appClient.connect();
    appClient.log.setLevel('trace');
    appClient.on('connect', function () {
      appClient.subscribeToDeviceEvents("Whisk-Action","whisk","score");
    });
    appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
      console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);
      var pay = JSON.parse(payload);

      $("#scoreP1").text(pay.p1);
      $("#scoreP2").text(pay.p2);
      $("#setP1").text(pay.p1set);
      $("#setP2").text(pay.p2set);
    });
  }
);
