import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavigationBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/Users/UsersList";
import User from "./components/Users/User";
import DislikesLikesComponents from "./components/DislikesLikesComponents";
import Discover from "./components/DiscoverPage/DiscoverPage";
import QuestionAnswerForm from "./components/auth/QuestionForm";
import ProfilePage from "./components/ProfilePage/ProfileComponent";
import DiscoverProfilePage from './components/DiscoverProfilePage/DiscoverProfileComponent';

import { authenticate } from "./store/session";
import Mismatches from "./components/Mismatches/Mismatches";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path={["/dislikes", "/likes"]}>
                    <DislikesLikesComponents />
                </ProtectedRoute>
                <ProtectedRoute path="/users" exact={true}>
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/questions">
                    <QuestionAnswerForm />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/discover/:discoverId'>
                    <DiscoverProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path="/discover">
                    <Discover />
                </ProtectedRoute>
                <ProtectedRoute path="/profile">
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path="/mismatches">
                    <Mismatches />
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
