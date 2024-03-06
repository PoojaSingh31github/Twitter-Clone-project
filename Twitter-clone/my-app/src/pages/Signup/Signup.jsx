import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from '../../redux/userSlice';
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // for navigate to page
    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/signup", { username, email, password });
            dispatch(loginSuccess(res.data));
            navigate("/");
            toast.success('signup successful!');
        } catch (error) {
            dispatch(loginFailed());
            toast.error('signup failed. Please check your credentials and try again.');
        }
    }
    return (
        <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
            <div className="flex items-center justify-center">
                <div
                    className="bg-gray-400 border-[3px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200"
                >
                    <div
                        className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col"
                    >
                        <svg viewBox="0 0 24 24" className="h-12 w-12 text-white" fill="currentColor">
                            <g>
                                <path
                                    d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                                ></path>
                            </g>
                        </svg>
                        <h1 className="text-white text-2xl">Sign up to Twitter</h1>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="User name"
                            type="text"
                            name="name"
                            id=""
                        />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="Email"
                            type="email"
                            name="email"
                            id=""
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="Password"
                            type="password"
                            name="password"
                            id=""
                        />
                        <input
                            className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                            type="submit"
                            id=""
                            onClick={handleSignup}
                        />

                        <p>
                             have an account?
                            <Link to="/signin" className="font-semibold text-white hover:text-blue-500 transition-all duration-200">Sign in</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </form>
    )
}

export default Signup;