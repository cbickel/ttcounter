// Insert names from Query-Parameters
$(document).ready(function(){
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
  }
);
