const _ = require('lodash');
const got = require('got');

const getAllChannels = async () => {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
            },
            responseType: "json",
            throwHttpErrors: false
        };
        return await got.get(`https://slack.com/api/conversations.list`, options);
    } catch (err) {
        console.log(`Error fetching all channels from slack: ${JSON.stringify(err)}`);
    }
};

exports.fetchChannelIdByName = async (name) => {
    const allChannelsRes = await getAllChannels();
    if (!_.get(allChannelsRes, "body.ok")) {
        console.log(`Failed to fetch all channels, returned with HTTP ${allChannelsRes.statusCode}\n${JSON.stringify(allChannelsRes.body)}`);
        return;
    }
    const matchingChannel = _.find(allChannelsRes?.body?.channels, (channel) => channel.name === name);
    if (!matchingChannel) {
        console.log(`Counld not find matching channel ${name}`);
        return;
    }
    return matchingChannel.id;
};

exports.sendMessageToChannel = async (channelId, messagePayload = {}) => {
    try {
        const options = {
            headers: {
                "Content-type": `application/json`,
                Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
            },
            json: {
                channel: channelId,
                text: messagePayload.text
            },
            responseType: "json",
            throwHttpErrors: false
        };
        console.log(`Sending message to slack channel`);
        return await got.post(`https://slack.com/api/chat.postMessage`, options);
    } catch (err) {
        console.log(`Error fetching all channels from slack: ${JSON.stringify(err)}`);
    }
};

exports.sendSlashCommandMessageResponse = async (responseUrl, messagePayload) => {
    try {
        console.log(`Sending /miqstatus response message back to slack`);
        await got.post(responseUrl, { json: messagePayload });
    } catch (err) {
        console.log(`Error sending response message back to slack: ${JSON.stringify(err)}`);
        throw err;
    }
};