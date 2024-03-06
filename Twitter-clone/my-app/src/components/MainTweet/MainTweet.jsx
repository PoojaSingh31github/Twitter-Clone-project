import React, { useState } from 'react'
import TimeLineTweet from '../TimeLineTweet/TimeLineTweet'
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainTweet = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [tweetText, setTweetText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitTweet = await axios.post("/tweets", {
                userId: currentUser._id,
                description: tweetText,

            });
            window.location.reload(false);
            toast.success('Tweet posted successfully!');
        } catch (err) {
            toast.error('Error posting tweet. Please try again.');
        }
    };


    return (
        <div>
            {currentUser && (
                <p className="font-bold pl-2 my-2">{currentUser.username}</p>
            )}
            <form className="border-b-2 pb-6">
                <textarea
                    onChange={(e) => setTweetText(e.target.value)}
                    type="text"
                    placeholder="What is happening today?!"
                    maxLength={380}
                    className="bg-slate-200 rounded-lg w-full p-2">
                </textarea>
                <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-full">Tweet</button>
            </form>
            <TimeLineTweet />
            <ToastContainer />
        </div>
    )
}

export default MainTweet