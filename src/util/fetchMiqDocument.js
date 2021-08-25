const got = require('got');

exports.fetchMiqPortalDocument = async () => {
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.37'
        },
        throwHttpErrors: false
    };
    try {
        return got.get("https://allocation.miq.govt.nz/portal/", options);
    } catch (err) {
        console.log(`Error fetching https://allocation.miq.govt.nz/portal/ ${JSON.stringify(err)}`);
        throw err;
    }
};