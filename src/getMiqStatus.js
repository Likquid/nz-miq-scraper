const _ = require('lodash');
const { parse } = require('node-html-parser');
const { fetchMiqPortalDocument } = require('./util/fetchMiqDocument');
const { TARGET_MONTH, unableToReachSiteText, targetMonthNotReleasedText, targetMonthReleasedText } = require('./util/messageFormatter')
const { sendSlashCommandMessageResponse } = require('./service/slackAdapter');

exports.getMiqStatus = async (req, res) => {
    let messagePayload = {};
    const responseUrl = req.body.response_url;
    const miqPortalRes = await fetchMiqPortalDocument();
    if (miqPortalRes.statusCode === 200) {
        console.log(`https://allocation.miq.govt.nz/portal/ retuned with ${miqPortalRes.statusCode}`);
        const root = parse(miqPortalRes.body);
        const targetNode = root.querySelector(`.mo-${TARGET_MONTH}-2021`);
        messagePayload = !_.isEmpty(targetNode) ? targetMonthReleasedText() : targetMonthNotReleasedText();
    } else {
        messagePayload = unableToReachSiteText(miqPortalRes.statusCode);
    }
    res.status(200).send();
    return await sendSlashCommandMessageResponse(responseUrl, messagePayload);
};