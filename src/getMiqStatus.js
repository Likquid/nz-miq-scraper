const _ = require('lodash');
const got = require('got');
const { parse } = require('node-html-parser');
const { delayedResponse } = require('./util/sendSlackMessage');

const TARGET_MONTH = 12;
const TARGET_MONTH_NAME = "December";

const fetchMiqPortalDocument = async () => {
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.37'
        },
        throwHttpErrors: false
    };
    try {
        return got.get("https://allocation.miq.govt.nz/portal/", options);
    } catch (err) {
        return err.response;
    }
};

const unableToReachSiteText = (statusCode) => {
    return {
        response_type: 'ephemeral',
        text: `Something went wrong... Can't access https://allocation.miq.govt.nz/portal/ returned a HTTP ${statusCode}`
    }
};

const targetMonthNotReleasedText = () => {
    return {
        response_type: 'ephemeral',
        text: `MIQ for ${TARGET_MONTH_NAME} is not released yet`
    }
};

const targetMonthReleasedText = () => {
    return {
        response_type: 'ephemeral',
        text: `${TARGET_MONTH_NAME}'s MIQ is released! Go book it now!`
    }
};

exports.getMiqStatus = async (req, res) => {
    let message = {};
    const responseUrl = req.body.response_url;
    const miqPortalRes = await fetchMiqPortalDocument();
    if (miqPortalRes.statusCode === 200) {
        console.log(`https://allocation.miq.govt.nz/portal/`);
        const root = parse(miqPortalRes.body);
        const targetNode = root.querySelector(`.mo-${TARGET_MONTH}-2021`);
        message = !_.isEmpty(targetNode) ? targetMonthReleasedText() : targetMonthNotReleasedText();
    } else {
        message = unableToReachSiteText(miqPortalRes.statusCode);
    }
    res.status(200).send();
    return await delayedResponse(responseUrl, message);
};