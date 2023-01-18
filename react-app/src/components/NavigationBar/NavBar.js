import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './NavBar.css';
import magnify from '../../assets/magnifying.png';
import heart from '../../assets/heart.png';
import user_disc from '../../assets/discover.png'
import message from '../../assets/message.png'

const NavBar = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <nav className="nav-container">
            <div className='home-link'>
                <NavLink to="/discover" exact={true} id='home-link' activeClassName="active" className='nav-link'>
                    notOKcupid
                </NavLink>
            </div>
            {!user && (
                <div className='login-signup'>
                    <div>
                        <NavLink
                            to="/login"
                            exact={true}
                            activeClassName="active-nav"
                            className='nav-link'
                        >
                            Login
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to="/sign-up"
                            exact={true}
                            activeClassName="active-nav"
                            className='nav-link'
                        >
                            SignUp
                        </NavLink>
                    </div>
                </div>
            )}
            {user && (
                <div className='user-content'>
                    <div>
                        <NavLink
                            to="/discover"
                            exact={true}
                            activeClassName="active-nav"
                            className='nav-link'
                        >
                        <img src={user_disc} id='nav-icon'/>
                            Discover
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to="/dislikes"
                            exact={true}
                            activeClassName="active-nav"
                            className='nav-link'
                        >
                        <img src={heart} id='nav-icon' />
                            Dislikes
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/questions" activeClassName="active-nav" className='nav-link'>
                        <img src={magnify} id='nav-icon' />
                            Questions
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/mismatches" activeClassName="active-nav" className='nav-link'>
                        <img src={message} id='nav-icon' />
                            Mismatches
                        </NavLink>
                    </div>
                    <div className='profile-logout'>
                        <div>
                            <NavLink to="/profile" activeClassName="active-nav" className='nav-link'>
                                <img src={user.userImages[0].imageUrl} id='profile-pic' />
                                <span id='username-nav'>{user.username}</span>
                            </NavLink>
                        </div>
                        <div>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
