import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import QuestionAnswerForm from './components/auth/QuestionForm'
import { authenticate } from './store/session';
import Mismatches from './components/Mismatches';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const userAnswerArray = user?.userAnswers
  let content = null
  if (userAnswerArray){
    content = Object.values(userAnswerArray)
  }
  console.log(content)

  useEffect(() => {
    (async() => {
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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/questions'>
              <QuestionAnswerForm />
        </ProtectedRoute>
        <ProtectedRoute path='/mismatches/user/:userId'>
              <Mismatches />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter> 
  );
}

export default App;
