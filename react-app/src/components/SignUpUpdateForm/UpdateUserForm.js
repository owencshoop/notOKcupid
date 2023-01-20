import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateUser } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./SignUpForm";

const UpdateUserForm = () => {
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    // const [username, setUsername] = useState(user.username);
    // const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [preferredGenders, setPreferredGenders] = useState(
        user.preferredGenders
    );
    const [minAge, setMinAge] = useState(user.minAge);
    const [maxAge, setMaxAge] = useState(user.maxAge);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [bio, setBio] = useState(user.bio);
    // const [imageURL, setImageURL] = useState(user.userImages[0].imageUrl);
    const [saved, setSaved] = useState(false);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        const data = await dispatch(
            updateUser(
                firstName,
                age,
                gender,
                preferredGenders,
                minAge,
                maxAge,
                city,
                state,
                bio,
            )
        );
        if (data) {
            setErrors(data);
        } else {
            setSaved(true);
            await closeModal()
        }
    };

    // const updateUsername = (e) => {
    //     setUsername(e.target.value);
    // };

    // const updateEmail = (e) => {
    //     setEmail(e.target.value);
    // };

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

    // const updateImageURL = (e) => {
    //     setImageURL(e.target.value);
    // };

    if (saved) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="user-form-container">
            <div className="form-input-container">
                <form onSubmit={onSignUp} className="errors-div-container">
                    <div>
                        {errors.map((error, ind) => (
                            <div className='errors-div' key={ind}>{error}</div>
                        ))}
                    </div>
                    {/* <div className="signup-form-input-container">
                        <label className="signup-input-label">User Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={updateUsername}
                            value={username}
                            className="signup-input-field"
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={updateEmail}
                            value={email}
                            className="signup-input-field"
                        ></input>
                    </div> */}
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={updateFirstName}
                            value={firstName}
                            require="true"
                            className="signup-input-field"
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
                            className="signup-input-field"
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Gender</label>
                        <select
                            name="gender"
                            onChange={updateGender}
                            require="true"
                            className="signup-input-field"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="nonbinary">Nonbinary</option>
                        </select>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Preferred Gender/s</label>
                        <select
                            name="preferredGender"
                            onChange={updatePreferredGenders}
                            require="true"
                            className="signup-input-field"
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
                            className="signup-input-field"
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
                            className="signup-input-field"
                        ></input>{" "}
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">City</label>
                        <input
                            type="text"
                            name="city"
                            onChange={updatecity}
                            value={city}
                            className="signup-input-field"
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">State</label>
                        <input
                            type="text"
                            name="state"
                            onChange={updateState}
                            value={state}
                            className="signup-input-field"
                        ></input>
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Bio</label>
                        <input
                            type="textarea"
                            name="bio"
                            onChange={updateBio}
                            value={bio}
                            className="signup-bio-field"
                        ></input>
                    </div>
                    {/* <div className="signup-form-input-container">
                        <label className="signup-input-label">Profile Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            onChange={updateImageURL}
                            value={imageURL}
                            className="signup-input-field"
                        ></input>
                    </div> */}
                    <button type="submit" className="sign-up-button">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserForm;
