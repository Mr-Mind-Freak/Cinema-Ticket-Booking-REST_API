const User = require('../models/User');

const getAllUser = async (req,res) => {
    const users = await User.find();
    if(!users) return res.sendStatus(204);
    res.status(200).json(users);
}

const deleteUser = async (req, res) => {
    const username = req.username;
    if(!username) return res.status(400).json({"message":"Username is required."});
    const user = await User.findOne({ username });
    if(!user) return res.sendStatus(204);
    const result = await User.deleteOne({ username });
    if(result.acknowledged)
        return res.status(200).json({"message":`${username} account deleted`});
    res.status(500).json({"message":"server error"});
    
}

const getUser =async(req, res) => {
    const username = req.params.username;
    if(!username) return res.status(400).json({"message":"Username is required"});
    const user = await User.findOne({ username });
    if(!user) return res.sendStatus(204);
    res.status(200).json(user);
}

module.exports = { getAllUser,  deleteUser, getUser };