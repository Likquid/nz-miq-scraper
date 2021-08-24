const got = require('got');

exports.delayedResponse = async (responseUrl, data) => {
    const options = {
        body: data,
        json: true,
        throwHttpErrors: false
    };
    await got.post(responseUrl, options);
};