const got = require('got');

exports.delayedResponse = async (responseUrl, data) => {
    console.log("sending message to slack");
    await got.post(responseUrl, { json: data });
};