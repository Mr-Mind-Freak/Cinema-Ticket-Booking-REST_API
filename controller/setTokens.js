const jwt = require('jsonwebtoken');

const setAccessToken = (user) => {
    const payload = {
        username: user.username,
        profile: user.profile
    }
    const secret = process.env.ACCESS_TOKEN;
    const options = { expiresIn: '4h' };
    const access_token = jwt.sign(payload,secret,options);
    return access_token;
}

const setRefreshToken = async(user) => {
    const payload = {
        username: user.username,
        profile: user.profile
    }
    const secret = process.env.REFRESH_TOKEN;
    const options = { expiresIn: '1d' };
    const refresh_token = jwt.sign(payload,secret,options);
    user.refreshToken = refresh_token;
    const result = await user.save();
    return refresh_token;
}

module.exports = { setAccessToken, setRefreshToken }