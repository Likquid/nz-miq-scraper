const axios = require('axios');

const fetchMiqPortalDocument = async () => {
    try {
        return await axios({
            method: 'get',
            url: `https://allocation.miq.govt.nz/portal/`,
            responseType: 'document'
        });
    } catch (err) {
        return err.response;
    }
};

exports.contentFetcher = async () => {
    const contentDocument = await fetchMiqPortalDocument();
    console.log(`https://allocation.miq.govt.nz/portal/ returned with status ${contentDocument.status}`);
};