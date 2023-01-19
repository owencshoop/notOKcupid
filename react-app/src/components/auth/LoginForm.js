import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import './LoginForm.css'

const LoginFormModal = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            await closeModal();
        }
    };

    const demoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login("demo@aa.io", "password"));
        if (data) {
            setErrors(data);
        }
        await closeModal();
    };
    const demoLogin2 = async (e) => {
        e.preventDefault();
        const data = await dispatch(login("demo@user.io", "password"));
        if (data) {
            setErrors(data);
        }
        await closeModal();
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/discover" />;
    }

    return (
        <div className="login-form-container">
            <h2>Sign In to notOKcupid</h2>
            <form onSubmit={onLogin}>
                <div className="errors-div-container">
                    {errors.map((error, ind) => (
                        <div key={ind} className='errors-div'>{error}</div>
                    ))}
                </div>
                <div className="login-form-input-container">
                    <label htmlFor="email" className="login-input-label">Email</label>
                    <input
                        name="email"
                        type="text"
                        
                        value={email}
                        onChange={updateEmail}
                        className='login-input-field'
                    />
                </div>
                <div className="login-form-input-container">
                    <label htmlFor="password" className="login-input-label">Password</label>
                    <input
                        name="password"
                        type="password"
                        
                        value={password}
                        onChange={updatePassword}
                        className='login-input-field'
                    />
                </div>
                    <button type="submit" className="login-button">Login</button>
                <div id="issaDemo">
                    <button id="demoLogin1" type="submit" onClick={demoLogin} className='demo-login-button'>
                        Log in as Demo User1
                    </button>
                    <button id="demoLogin2" type="submit" onClick={demoLogin2} className='demo-login-button'>
                        Log in as Demo User2
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginFormModal;
