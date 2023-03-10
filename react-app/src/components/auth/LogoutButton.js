import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LoginForm.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='logout-button-on-nav' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
