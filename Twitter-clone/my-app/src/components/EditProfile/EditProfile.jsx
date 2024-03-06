import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, logout } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import app from "../../firebase";


const EditProfile = ({ setOpen }) => {
    const { currentUser } = useSelector((state) => state.user);

    const [img, setImg] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const uploadImg = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImgUploadProgress(Math.round(progress));

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // console.log('File available at', downloadURL);
                    try {
                        const updateProfile = await axios.put(`/users/${currentUser._id}`, {
                            profilePicture: downloadURL,
                        });

                        console.log(updateProfile)
                    } catch (error) {
                        console.log(error);
                    }
                    console.log("downloaded " + downloadURL);
                    dispatch(changeProfile(downloadURL));
                });
            }
        );

    };

    const handleDelete = async () => {
        const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
        console.log(deleteProfile);
        dispatch(logout());
        navigate("/signin");


    }
    useEffect(() => {
        img && uploadImg(img);
    }, [img]);


    return (
        <>
            <div className="absolute inset-x-4 top-50 z-20  bg-transparent flex item-center justify-center">
                <div className=" bg-sky-300  flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200"
                >
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-3 right-95 cursor-pointer text-blue-900"
                    >
                        X
                    </button>
                    <svg viewBox="0 0 24 24" className="h-12 w-12 text-blue-900" fill="currentColor">
                        <g>
                            <path
                                d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                            ></path>
                        </g>
                    </svg>
                    <h1 className="text-white text-2xl">edit Profile</h1>
                    <p className='text-xl'>Choose a new profile picture</p>

                    {imgUploadProgress > 0 ? (
                        "Uploading" + imgUploadProgress + "%"
                    ) : (
                        <input type="file"
                            className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"

                            accept="image/*"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    )}
                    <p className='text-xl'>Delete Account</p>
                    <button
                        className=" bg-red-600 w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"

                        onClick={handleDelete}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditProfile