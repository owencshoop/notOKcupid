import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const NavBar = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <nav>
            <ul id="nav-bar">
                <li>
                    <NavLink to="/" exact={true} activeClassName="active">
                        Home
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                exact={true}
                                activeClassName="active"
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                activeClassName="active"
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
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dislikes"
                                exact={true}
                                activeClassName="active"
                            >
                                Dislikes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/discover"
                                exact={true}
                                activeClassName="active"
                            >
                                Discover
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/questions" activeClassName="active">
                                Questions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/mismatches" activeClassName="active">
                                Mismatches
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" activeClassName="active">
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
