import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";


//Signup start here
// Method : POST
// access: http://localhost:5500/api/auth/signup

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT);
        const { password, ...otherData } = newUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            // .json(newUser) // if we want to show password in DB
            .json(otherData); // if we don't want to show password in DB.
    } catch (err) {
        next(err)
    }
};


//Signup start here
// Method : POST
// access: http://localhost:5500/api/auth/signin

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(handleError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(handleError(404, "Wrong Password"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...otherData } = user._doc;

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(otherData);
    } catch (error) {
        next(err);

    }
};
