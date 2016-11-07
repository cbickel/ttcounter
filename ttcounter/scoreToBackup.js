function main(params) {
    var payload = params.payload || {};

    var backup = JSON.stringify(payload);

    return {
        payload: {
            backup: backup
        }
    };
}
