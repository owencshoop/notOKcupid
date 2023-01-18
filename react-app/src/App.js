import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
// import LoginFormModal from "./components/auth/LoginForm";
import SignUpForm from "./components/SignUpUpdateForm/SignUpForm";
import NavBar from "./components/NavigationBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/Users/UsersList";
import User from "./components/Users/User";
import DislikesLikesComponents from "./components/DislikesLikesComponents";
import Discover from "./components/DiscoverPage/DiscoverPage";
import QuestionAnswerForm from "./components/Questions/QuestionForm";
import ProfilePage from "./components/ProfilePage/ProfileComponent";
import DiscoverProfilePage from './components/DiscoverProfilePage/DiscoverProfileComponent';
import MismatchMessages from "./components/MismatchMessage";
import SplashPage from "./components/SplashPage"

import { authenticate } from "./store/session";
import Mismatches from "./components/Mismatches/Mismatches";
import UpdateUserForm from "./components/SignUpUpdateForm/UpdateUserForm";

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
        // <BrowserRouter>
        <>
            <NavBar />
            <Switch>
                {/* <Route path="/login" exact={true}>
                    <LoginFormModal />
                </Route> */}
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
                <ProtectedRoute path='/profile/update'>
                    <UpdateUserForm />
                </ProtectedRoute>
                <ProtectedRoute path="/profile">
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path='/mismatches/:mismatchId'>
                    <MismatchMessages />
                </ProtectedRoute>
                <ProtectedRoute path="/mismatches">
                    <Mismatches />
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <SplashPage />
                </Route>
            </Switch>
        {/* </BrowserRouter> */}
        </>
    );
}

export default App;
