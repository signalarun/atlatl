module.exports = {
    Google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callback:process.env.GOOGLE_STRATEGY_CALLBACK
    },
    Facebook: {
        appID: 'todo',
        appSecret: 'todo',
        callback:process.env.FACEBOOK_STRATEGY_CALLBACK
    },
    Twitter: {
        consumerKey: 'todo',
        consumerSecret: 'todo',
        callback:process.env.TWITTER_STRATEGY_CALLBACK
    }
};