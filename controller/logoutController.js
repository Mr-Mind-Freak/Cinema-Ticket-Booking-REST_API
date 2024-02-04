const User = require('../models/User');

const handleLogout = async(req, res) => {
    const refreshToken = req.cookies['jwt'] || null;
    if(!refreshToken){
        return res.sendStatus(204); //No content
    }
    const { username } = req.body;
    if(!username || !refreshToken)
        return res.status(400).json({"message":"User name is required to log out"});
    const foundUser = await User.findOne({username}).exec();

    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = "";
    foundUser.active = false;
    const result = foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(200).json({"message":`${username} account successfully logged out`});
}

module.exports = { handleLogout }