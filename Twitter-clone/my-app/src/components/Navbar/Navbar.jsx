import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import UserPlaceholder from '../UserPlaceholder/UserPlaceholder';
import '../Navbar/Navbar.css';

const Navbar = () => {
    
    const [userData, setUserData] = useState(null);
    const location = useLocation().pathname;
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
            <div className="mx-auto">
                <button class="cursor-pointer group block px-5 py-2 rounded-md bg-black text-white text-4xl font-bold shadow-2xl hover:scale-110 transition active:scale-90">
                    <span class="group-hover:[text-shadow:3px_3px_6px_var(--tw-shadow-color)] shadow-white">𝕏</span>
                </button>
            </div>
            <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:0">
                    <h2 className="font-bold "> 
                        {location.includes("profile") ? (
                            <UserPlaceholder setUserData={setUserData} userData={userData} />
                        ) : location.includes("explore") ? (
                            "Explore "
                        ) : (
                            "Home"
                        )}
                    </h2>
            </div>
            <div className="px-0 md:px-6 mx-auto hover:scale-105 transition-all duration-400">
                <SearchIcon className="absolute m-2" />
                <input type="text" placeholder="Search" className="bg-blue-100 rounded-full py-2 px-8  " />
            </div>
        </div>
    )
}
export default Navbar