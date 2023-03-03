import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { signUp, updateUser } from "../../store/session";
import { useModal } from "../../context/Modal";
import InformationModal from "../InformationModal";
import "./signup.css";

const SignUpForm = () => {
    const { closeModal, setModalContent } = useModal();
    const user = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(user ? user.username : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState(user ? user.firstName : "");
    const [age, setAge] = useState(user ? user.age : 18);
    const [gender, setGender] = useState(user ? user.gender : "male");
    const [preferredGenders, setPreferredGenders] = useState(
        user ? user.preferredGenders : "male"
    );
    const [minAge, setMinAge] = useState(user ? user.minAge : 18);
    const [maxAge, setMaxAge] = useState(user ? user.maxAge : 100);
    const [city, setCity] = useState(user ? user.city : "");
    const [state, setState] = useState(user ? user.state : "");
    const [bio, setBio] = useState(user ? user.bio : "");
    const [imageURL, setImageURL] = useState(
        user ? user.userImages[0].imageURL : ""
    );
    const dispatch = useDispatch();
    const modalRef = useRef();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (user) {
            const data = await dispatch(
                updateUser(
                    username,
                    email,
                    firstName,
                    age,
                    gender,
                    preferredGenders,
                    minAge,
                    maxAge,
                    city,
                    state,
                    bio,
                    imageURL
                )
            );
            if (data) {
                setErrors(data);
            }
        } else {
            if (password !== repeatPassword) {
                setErrors(['password : Passwords do not match'])
            }
            else if (password === repeatPassword) {
                const data = await dispatch(
                    signUp(
                        username,
                        email,
                        password,
                        firstName,
                        age,
                        gender,
                        preferredGenders,
                        minAge,
                        maxAge,
                        city,
                        state,
                        bio,
                        imageURL
                    )
                );
                if (data) {
                    setErrors(data);
                    // scrollToTop();
                } else {
                    await setModalContent(<InformationModal />)
                }
            }
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const updateAge = (e) => {
        setAge(e.target.value);
    };

    const updateGender = (e) => {
        setGender(e.target.value);
    };

    const updatePreferredGenders = (e) => {
        setPreferredGenders(e.target.value);
    };

    const updateMinAge = (e) => {
        setMinAge(e.target.value);
    };

    const updateMaxAge = (e) => {
        setMaxAge(e.target.value);
    };

    const updatecity = (e) => {
        setCity(e.target.value);
    };

    const updateState = (e) => {
        setState(e.target.value);
    };

    const updateBio = (e) => {
        setBio(e.target.value);
    };

    const updateImageURL = (e) => {
        setImageURL(e.target.value);
    };

    const demoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login("demo@aa.io", "password"));
        if (data) {
            setErrors(data);
        }
        await closeModal()
        await setModalContent(<InformationModal />);
    };

    useEffect(() => {
        if (errors.length > 0) {
            modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [errors]);

    if (user) {
        return <Redirect to="/discover" />;
    }

    return (
        <div className="user-form-container" ref={modalRef}>
            <div className="form-input-container">
                <form onSubmit={onSignUp}>
                    <h2 className="signup-label">Sign Up</h2>
                    <button id="signup-demo" type="submit" onClick={demoLogin} className='demo-signup-button'>
                        Skip Sign up with Demo user login
                    </button>
                    <div className="errors-div-container">
                        {errors.map((error, ind) => (
                            <div className='errors-div' key={ind}>{error.split(':')[1]}</div>
                        ))}
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">User Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={updateUsername}
                            value={username}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={updateEmail}
                            value={email}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={updatePassword}
                            value={password}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Repeat Password</label>
                        <input
                            type="password"
                            name="repeat_password"
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            require="true"
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={updateFirstName}
                            value={firstName}
                            require="true"
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Age: {age} years</label>
                        <input
                            type="range"
                            name="age"
                            min="18"
                            max="100"
                            onChange={updateAge}
                            value={age}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Gender</label>
                        <select
                            name="gender"
                            onChange={updateGender}
                            require="true"
                            className='signup-input-field'
                        >
                            <option className='signup-input-field' value="male">Male</option>
                            <option className='signup-input-field' value="female">Female</option>
                            <option className='signup-input-field' value="nonbinary">Nonbinary</option>
                        </select>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Preferred Gender/s</label>
                        <select
                            name="preferredGender"
                            onChange={updatePreferredGenders}
                            require="true"
                            className='signup-input-field'
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="nonbinary">Nonbinary</option>
                            <option value="male, female">
                                Male and Female
                            </option>
                            <option value="male, female, nonbinary">
                                Male, Female, and Nonbinary
                            </option>
                            <option value="male, nonbinary">
                                Male and Nonbinary
                            </option>
                            <option value="female, nonbinary">
                                Female and Nonbinary
                            </option>
                        </select>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Minimum Age: {minAge} years</label>
                        <input
                            type="range"
                            name="minAge"
                            min="18"
                            max="99"
                            onChange={updateMinAge}
                            value={minAge}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Maximum Age: {maxAge} years</label>
                        <div className="min-max"><p>{`${minAge}`} </p><p>{`100`} </p></div>
                        <input
                            type="range"
                            name="maxAge"
                            min={minAge}
                            max="100"
                            onChange={updateMaxAge}
                            value={maxAge}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">City</label>
                        <input
                            type="text"
                            name="city"
                            onChange={updatecity}
                            value={city}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">State</label>
                        <input
                            type="text"
                            name="state"
                            onChange={updateState}
                            value={state}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Bio</label>
                        <textarea
                            type="textarea"
                            name="bio"
                            onChange={updateBio}
                            value={bio}
                            className='signup-bio-field'
                        ></textarea>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Profile Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            onChange={updateImageURL}
                            value={imageURL}
                            className='signup-input-field'
                        ></input>
                    </div>
                    <button type="submit" className="sign-up-button">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
