exports.TARGET_MONTH = 12;
exports.TARGET_MONTH_NAME = "December";

exports.unableToReachSiteText = (statusCode) => {
    return {
        response_type: 'ephemeral',
        text: `Something went wrong... Can't access https://allocation.miq.govt.nz/portal/ returned a HTTP ${statusCode}`
    }
};

exports.targetMonthNotReleasedText = () => {
    return {
        response_type: 'ephemeral',
        text: `MIQ for ${exports.TARGET_MONTH_NAME} is not released yet`
    }
};

exports.targetMonthReleasedText = () => {
    return {
        response_type: 'ephemeral',
        text: `${exports.TARGET_MONTH_NAME}'s MIQ is released! Go book it now!`
    }
};