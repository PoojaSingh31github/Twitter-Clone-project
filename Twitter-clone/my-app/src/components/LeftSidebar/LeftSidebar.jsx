import React from 'react'
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Notifications from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import '../LeftSidebar/LeftSideBar.css';

const LeftSidebar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        
        <div className="flex flex-col h-full md:h-[80vh] justify-between mr-6">
            <div className="mt-6 flex flex-col space-y-4">
                <Link to="/">
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <HomeIcon fontSize="large" />
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="/">
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <Notifications fontSize="large" />
                        <p>Notification</p>
                    </div>
                </Link>
                <Link to="/">
                    <div className="flex items-center space-x-6 px-2  hover:bg-sky-200 rounded-full cursor-pointer">
                        <SearchIcon fontSize="large" />
                        <p>Search</p>
                    </div>
                </Link><Link to="/">
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <MailOutlineIcon fontSize="large" />
                        <p>Message</p>
                    </div>
                </Link>
                <Link to="/explore">
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <TagIcon fontSize="large" />
                        <p>Explore</p>
                    </div>
                </Link>
                <Link to="/">
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <ListIcon fontSize="large" />
                        <p>List</p>
                    </div>
                </Link>
                <Link to="/">
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <PeopleIcon fontSize="large" />
                        <p>Community</p>
                    </div>
                </Link>
                <Link to={`/profile/${currentUser._id}`}>
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <PersonIcon fontSize="large" />
                        <p>Profile</p>
                    </div>
                </Link>
                <Link to="/">
                    <div className="flex items-center space-x-6 px-2 hover:bg-sky-200 rounded-full cursor-pointer">
                        <MoreHorizIcon fontSize="large" />
                        <p>More</p>
                    </div>
                </Link>
            </div>
           
            <div className="flex justify-between">
                <button id="btn-message" class="button-message">
                    <div class="content-avatar">
                        <div class="status-user"></div>
                        <div class="avatar">
                            <svg class="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
                        </div>
                    </div>
                    <div class="notice-content">
                        <div class="username">{currentUser.username}</div>
                        <div class="lable-message">Message<span class="number-message">3</span></div>
                        <div class="user-id">@{currentUser.username}</div>
                    </div>
                </button>
            </div>
            <Link to="signin">
                <button onClick={handleLogout} class="relative border hover:border-sky-500 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-12 w-56 rounded-full bg-sky-600  flex justify-center items-center font-extrabold">
                    <p class="z-10">Logout</p>
                </button>
            </Link>
        </div>
    )
}

export default LeftSidebar