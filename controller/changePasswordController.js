const User = require('../models/User');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
    try{
        const { username, email, newPassword } = req.body;
        if(!username || !newPassword || !email) return res.status(400).json({"message":"All fields are required"});
        const user = await User.findOne({ username }).exec();
        if(!user) return res.status(204).json({"message":`No account found as ${username}`});
        const match = user.email === email ? true : false;
        if(match){
            const hashedNewPass = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPass;
            const result = await user.save();
            return res.status(200).json({"message":"password successfullt changed,.please log in "});
        }
    }
    catch(err){
        return res.status(500).json({"message":err.message});
    }
}

module.exports = { changePassword };