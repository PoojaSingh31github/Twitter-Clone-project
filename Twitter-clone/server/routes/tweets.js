import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createTweet, deleteTweet, getAllTweets, getExploreTweets, getUserTweets, likeorDislike } from "../controllers/tweet.js";

const router = express.Router();

// For creating tweet
router.post('/', verifyToken, createTweet);

//For deleting tweet
router.delete('/:id', verifyToken, deleteTweet);

//For like or dislike tweet
router.put('/:id/like', verifyToken, likeorDislike);

//For getting all timeline tweets
router.get('/timeline/:id', getAllTweets);

//For getting single user tweets
router.get('/user/all/:id', getUserTweets);

//For getting All user tweets
router.get('/explore', getExploreTweets);


export default router;
