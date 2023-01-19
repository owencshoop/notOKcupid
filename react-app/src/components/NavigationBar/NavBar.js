import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginFormModal from "../auth/LoginForm"
import './NavBar.css';
import magnify from '../../assets/magnifying.png';
import heart from '../../assets/heart.png';
import user_disc from '../../assets/discover.png'
import message from '../../assets/message.png'
import OpenModalButton from "../OpenModalButton";


const NavBar = () => {
    const user = useSelector((state) => state.session.user);

    let disliked_num = user?.dislikedUser.length;

    return (
        <nav className={user ? "nav-container" : "splash-container"}>
            <div className='home-link'>
                <NavLink to="/discover" exact={true} id='home-link' activeClassName="active" className={user ? 'nav-link' : "splash-home-link"}>
                    notOKcupid
                </NavLink>
            </div>
            {!user && (
                <div className='login-signup'>
                    Already have an account?
                        <OpenModalButton
                            buttonText="Sign In"
                            modalComponent={<LoginFormModal />}
                            className="login-open-button"
                        />

                    {/* <div>
                        <NavLink
                            to="/sign-up"
                            exact={true}
                            activeClassName="active-nav"
                            className='nav-link'
                        >
                            SignUp
                        </NavLink>
                    </div> */}
                </div>
            )}
            {user && (
                <div className='user-content'>
                    <div className='nav-link-box'>
                        <NavLink
                            to="/discover"
                            exact={true}
                            activeClassName="active-nav"
                            className='nav-link'
                        >
                        <img src={user_disc} id='nav-icon' alt='discover'/>
                            Discover
                        </NavLink>
                    </div>
                    <div className='nav-link-box'>
                        <NavLink
                            to="/dislikes"
                            exact={true}
                            activeClassName="active-nav"
                            className='nav-link'
                        >
                        <img src={heart} id='nav-icon' alt='heart'/>
                        <span id='dislike-num'>{disliked_num}</span>
                            Dislikes
                        </NavLink>
                    </div>
                    <div className='nav-link-box'>
                        <NavLink to="/questions" activeClassName="active-nav" className='nav-link'>
                        <img src={magnify} id='nav-icon' alt='questions'/>
                            Questions
                        </NavLink>
                    </div>
                    <div className='nav-link-box'>
                        <NavLink to="/mismatches" activeClassName="active-nav" className='nav-link'>
                        <img src={message} id='nav-icon' alt='mismatch'/>
                            Mismatches
                        </NavLink>
                    </div>
                    <div className='profile-logout'>
                        <div className='nav-link-box'>
                            <NavLink to="/profile" activeClassName="active-nav" className='nav-link'>
                                <img src={user.userImages[0].imageUrl} id='profile-pic' alt='profile'/>
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
