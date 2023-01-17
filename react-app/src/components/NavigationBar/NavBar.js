import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './NavBar.css';

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
                                activeClassName="active"
                                className='nav-link'
                            >
                                Login
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                activeClassName="active"
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
                                activeClassName="active"
                                className='nav-link'
                            >
                                Discover
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/dislikes"
                                exact={true}
                                activeClassName="active"
                                className='nav-link'
                            >
                                Dislikes
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/questions" activeClassName="active" className='nav-link'>
                                Questions
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/mismatches" activeClassName="active" className='nav-link'>
                                Mismatches
                            </NavLink>
                        </div>
                        <div className='profile-logout'>
                        <div>
                            <NavLink to="/profile" activeClassName="active" className='nav-link'>
                                Profile
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
