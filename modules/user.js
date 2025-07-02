const { config } = require("../config.js");

module.exports.getUserAvatarURL = function (userId) {
    return new Promise((resolve, reject) => {
        if (!userId) {
            return reject(new Error("User ID is required"));
        }

        const url = `https://graph.facebook.com/${userId}/picture?type=square&height=720&width=720&access_token=${config.accessToken}`;

        try {
            new URL(url);
        } catch (error) {
            return reject(new Error("Invalid URL format"));
        }

        resolve(url);
    });
};

module.exports.getUserInfo = function (api, userId) {
    return new Promise((resolve, reject) => {
        if (!userId) {
            return reject(new Error("User ID is required"));
        }

        api.getUserInfo(userId, async (err, userInfo) => {
            if (err) {
                return reject(err);
            }
            userInfo[userId].avatarURL = await module.exports.getUserAvatarURL(
                userId
            );
            resolve(userInfo[userId]);
        });
    });
};
