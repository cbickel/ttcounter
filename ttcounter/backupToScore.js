function main(params) {
    var payload = {};
    if (typeof params.payload.backup === 'string') {
        payload = JSON.parse(params.payload.backup);
    } else {
        payload = params.payload.backup;
    }
    console.log(payload);
    console.log(typeof payload);

    return {
        payload: payload
    };
}
