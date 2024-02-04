const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { setAccessToken } = require('./setTokens');

const handleRefreshToken = async(req,res) => {
    const refreshToken = req.cookies['jwt'] || null;
    if(!refreshToken)
        return res.status(401).json({"message":"Access denied. no refresh token provided"});
    
    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if(!foundUser)
            return res.status(403).json({"message":"Please Log in"});
        
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            (err, decoded) => {
                if(err || foundUser.username !== decoded.username)
                    return res.status(403).json({"message":"Please Log in"});
                const accessToken = setAccessToken(decoded);
                res.status(200).json({ accessToken, "username":decoded.username });
            }
        );    
    } catch (error) {
        console.log(error.stack);
        return res.status(400).send('Invalid refresh token.');
    }
}

module.exports= { handleRefreshToken };