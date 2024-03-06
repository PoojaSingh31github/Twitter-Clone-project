import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";


// Getting Usrer by id
// access : http://localhost:5500/api/users/find/id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// Get all Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

// Update Usrer by id
// access : http://localhost:5500/api/users/id
export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(handleError(403, "You can only update your own acclount"));

    }
}

// Delete Usrer by id
// access : http://localhost:5500/api/users/id
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            await Tweet.remove({ userId: req.params.id });
            res.status(200).json("User Deleted");

        } catch (err) {
            next(err);

        }
    } else {
        return next(handleError(403, "You can only delete your account"));
    }
};

// Follow Usrer by id
// access : http://localhost:5500/api/users/follow/id

export const follow = async (req, res, next) => {
    try {
        //For user
        const user = await User.findById(req.params.id);
        //current user
        const currentUser = await User.findById(req.body.id);
        if (!user.followers.includes(req.body.id)) {
            await user.updateOne({
                $push: { followers: req.body.id },
            });
            await currentUser.updateOne({ $push: { following: req.params.id } });
        } else {
            res.status(403).json("you already follow this user");
        }
        res.status(200).json("following the User");
    } catch (err) {
        next(err);
    }
};

// Follow Usrer by id
// access : http://localhost:5500/api/users/unfollow/id

export const unfollow = async (req, res, next) => {
    try {
        //For user
        const user = await User.findById(req.params.id);
        //current user
        const currentUser = await User.findById(req.body.id);
        if (currentUser.following.includes(req.params.id)) {
            await user.updateOne({
                $pull: { followers: req.body.id },
            });
            await currentUser.updateOne({ $pull: { following: req.params.id } });
        } else {
            res.status(403).json("you are not following this user");
        }
        res.status(200).json("unfollowing the User");
    } catch (err) {
        next(err);
    }
};

