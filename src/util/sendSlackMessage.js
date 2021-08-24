const got = require('got');

exports.delayedResponse = async (responseUrl, data) => {
    await got.post(responseUrl, { body: data });
};