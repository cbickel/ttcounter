function main(params) {
    var payload = params.payload || {};

    if (isSetFinished(payload)) {
        var setWinner = parseInt(payload.p1) > parseInt(payload.p2) ? "p1set" : "p2set";
        payload.p1 = 0;
        payload.p2 = 0;
        payload[setWinner] = parseInt(payload[setWinner]) + 1;
    }
    return { payload: payload };
}

function isSetFinished(payload) {
    var p1 = parseInt(payload.p1);
    var p2 = parseInt(payload.p2);
    return (p1 >= 11 && p1 - p2 >= 2) || (p2 >= 11 && p2 - p1 >= 2);
}
