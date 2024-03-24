const Reviews = require('../models/Review');
const Users = require('../models/User');
const Ticket = require('../models/Ticket');

const getReviews = async (req, res) => {
    const { movie_name } = req.body;
    if(!movie_name)
        return res.status(400).json({"message":"Movie name is required"});
    const reviews = await Reviews.find({ movie_name });
    if(reviews.length <= 0)
        return res.sendStatus(204);
    res.status(200).json(reviews);
}

const uploadReview = async (req, res) => {
    const username = req.username;
    if(!username)
        return res.status(403).json({"message":"Please log in..."});
    const { movie_name, hashtags, content, no_of_likes, ratings } = req.body;
    if(!movie_name)
        return res.status(400).json({"message":"Movie name is required"});
    if(!ratings)
        return res.status(400).json({"message":"Please give your ratings"});
    const ticket = await Ticket.findOne({ movieName : movie_name, userName : username });
    if(!ticket) return res.status(409).json({message : `${username} haven't watched the movie yet`});
    let duplicateReview = await Reviews.findOne({ username, movie_name });
    if(duplicateReview){ 
        return res.status(409).json({
            "message":`A review for ${movie_name} movie from ${username} is already exists`
        });
    }
    let review = {
        username,
        movie_name,
        ratings,
        uploaded_on : new Date()
    }
    if(hashtags) review['hashtags'] = hashtags;
    if(no_of_likes) review['no_of_likes'] = no_of_likes;
    if(content) review['content'] = content;
    try {
        const addedReview = await Reviews.create(review);
        res.status(201).json({'message':`Review successfully added from ${username} account`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message": err.message});
    }
}

const deleteReview = async (req, res) => {
    const username = req.username;
    if(!username)
        return res.status(403).json({"message":'Please log in'});
    const review = await Reviews.find({ username });
    if(!review) return res.sendStatus(204);
    const result = await Reviews.deleteOne({ _id });
    if(result.acknowledged)
        return res.status(200).json({"message":`${username}'s review for ${movie_name} is deleted`});
    res.status(500).json({"message":"server error"});
}

const getOneUserReview = async(req, res) =>{
    const username = req.params.username;
    if(!username) return res.status(400).json({"message":"Username is required"});
    const reviews = await Reviews.find({ username });
    if(reviews.length <= 0) return res.sendStatus(204);
    res.status(200).json(reviews);
}
module.exports = { getReviews, uploadReview, deleteReview, getOneUserReview };