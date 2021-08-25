const _ = require('lodash');
const { parse } = require('node-html-parser');
const { fetchMiqPortalDocument } = require('./util/fetchMiqDocument');
const { TARGET_MONTH, unableToReachSiteText, targetMonthNotReleasedText, targetMonthReleasedText } = require('./util/messageFormatter')
const { fetchChannelIdByName, sendMessageToChannel } = require('./service/slackAdapter');

exports.channelBlast = async (req, res) => {
    let messagePayload = {};
    const miqPortalRes = await fetchMiqPortalDocument();
    if (miqPortalRes.statusCode === 200) {
        console.log(`https://allocation.miq.govt.nz/portal/ retuned with ${miqPortalRes.statusCode}`);
        const root = parse(miqPortalRes.body);
        const targetNode = root.querySelector(`.mo-${TARGET_MONTH}-2021`);
        messagePayload = !_.isEmpty(targetNode) ? targetMonthReleasedText() : targetMonthNotReleasedText();
    } else {
        messagePayload = unableToReachSiteText(miqPortalRes.statusCode);
    }
    const channelId = await fetchChannelIdByName(process.env.CHANNEL_NAME);
    res.status(200).send();
    return await sendMessageToChannel(channelId, messagePayload);
};