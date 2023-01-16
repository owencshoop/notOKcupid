import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './NavBar.css';

const NavBar = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <nav className="nav-container">
            <ul className="nav-links">
                <li id='home-link'>
                    <NavLink to="/" exact={true} activeClassName="active" className='nav-link'>
                        notOKcupid
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                exact={true}
                                activeClassName="active"
                                className='nav-link'
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                activeClassName="active"
                                className='nav-link'
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink
                                to="/users"
                                exact={true}
                                activeClassName="active"
                                className='nav-link'
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dislikes"
                                exact={true}
                                activeClassName="active"
                                className='nav-link'
                            >
                                Dislikes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/discover"
                                exact={true}
                                activeClassName="active"
                                className='nav-link'
                            >
                                Discover
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/questions" activeClassName="active" className='nav-link'>
                                Questions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/mismatches" activeClassName="active" className='nav-link'>
                                Mismatches
                            </NavLink>
                        </li>
                        <li id='profile-link'>
                            <NavLink to="/profile" activeClassName="active" className='nav-link'>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <LogoutButton />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
