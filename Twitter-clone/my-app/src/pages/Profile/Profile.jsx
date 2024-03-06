import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import Tweet from '../../components/Tweet/Tweet';
import EditProfile from '../../components/EditProfile/EditProfile';
import { following } from '../../redux/userSlice';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  console.log("tweets", userTweets);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweetsResponse = await axios.get(`/tweets/user/all/${id}`);
        const userProfileResponse = await axios.get(`/users/find/${id}`);
        setUserTweets(userTweetsResponse.data);
        setUserProfile(userProfileResponse.data);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };

    fetchData();
  }, [currentUser, id]);

   const handleFollow = async () => {
        if (!currentUser.following.includes(id)) {
            try {
                const follow = await axios.put(`/users/follow/${id}`, {
                    id: currentUser._id,

                });
                dispatch(following(id));
            } catch (err) {
                console.log("error", err)
            }
        } else {
            try {
                const unfollow = await axios.put(`/users/unfollow/${id}`, {
                    id: currentUser._id,
                });
                dispatch(following(id));
            } catch (err) {
                console.log("error", err)
            }
        }
    }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-15 ">
          <div className="w-full group before:hover:scale-95 before:hover:h-100 before:hover:w-full before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-full before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-sky-400 to-sky-200 before:absolute before:top-0 w-full h-72 relative bg-slate-50 flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden">
            <img
              src={userProfile?.profilePicture}
              alt="Profile"
              className="w-28 h-28 bg-blue-700 mt-4 rounded-full border-4 border-slate-50 z-10 group-hover:scale-130 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"
            />
            <div className="z-1 group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-semibold">{userProfile?.username}</span>
              <p>{userProfile?.email}</p>
            </div>
            {currentUser._id === id ? (
              <button
                className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-1 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            ) : currentUser.following.includes(id) ? (
              <button
                className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => (
                <div className="p-2" key={tweet._id}>
                  <Tweet tweet={tweet} setData={setUserTweets} />
                </div>
              ))}
          </div>
        </div>
        <div className="px-6">
          <RightSidebar />
        </div>
      {open && <EditProfile setOpen={setOpen} />}
      </div>
    </>
  );
};

export default Profile;
