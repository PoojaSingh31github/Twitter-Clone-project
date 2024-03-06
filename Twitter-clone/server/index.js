import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auths.js"
import tweetRoutes from "./routes/tweets.js"
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
// database are connected
const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("MongoDB Connected Successfully");
        })
        .catch((err) => {
            throw err;
        });
};
// All
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
app.listen(port, () => {
    connect();
    console.log(`server started on port ${port}`)
});