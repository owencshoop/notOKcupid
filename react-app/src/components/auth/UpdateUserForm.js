import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateUser } from "../../store/session";

const UpdateUserForm = () => {
    const user = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.firstName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [preferredGenders, setPreferredGenders] = useState(user.preferredGenders);
    const [minAge, setMinAge] = useState(user.minAge);
    const [maxAge, setMaxAge] = useState(user.maxAge);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [bio, setBio] = useState(user.bio);
    const [imageURL, setImageURL] = useState(user.userImages[0].imageUrl);
    const [saved, setSaved] = useState(false)
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
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
        setSaved(true)
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
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

    if (saved) {
        return <Redirect to="/profile" />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>User Name</label>
                <input
                    type="text"
                    name="username"
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={updateEmail}
                    value={email}
                ></input>
            </div>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    onChange={updateFirstName}
                    value={firstName}
                    require="true"
                ></input>
            </div>
            <div>
                <label>Age</label>
                <input
                    type="range"
                    name="age"
                    min="18"
                    max="100"
                    onChange={updateAge}
                    value={age}
                ></input>{" "}
                {age} years
            </div>
            <div>
                <label>Gender</label>
                <select name="gender" onChange={updateGender} require="true">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="nonbinary">Nonbinary</option>
                </select>
            </div>
            <div>
                <label>Preferred Gender/s</label>
                <select
                    name="preferredGender"
                    onChange={updatePreferredGenders}
                    require="true"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="nonbinary">Nonbinary</option>
                    <option value="male, female">Male and Female</option>
                    <option value="male, female, nonbinary">
                        Male, Female, and Nonbinary
                    </option>
                    <option value="male, nonbinary">Male and Nonbinary</option>
                    <option value="female, nonbinary">
                        Female and Nonbinary
                    </option>
                </select>
            </div>
            <div>
                <label>Minimum Age</label>
                <input
                    type="range"
                    name="minAge"
                    min="18"
                    max="100"
                    onChange={updateMinAge}
                    value={minAge}
                ></input>{" "}
                {minAge} years
            </div>
            <div>
                <label>Maximum Age</label>
                <input
                    type="range"
                    name="maxAge"
                    min={minAge}
                    max="100"
                    onChange={updateMaxAge}
                    value={maxAge}
                ></input>{" "}
                {maxAge} years
            </div>
            <div>
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    onChange={updatecity}
                    value={city}
                ></input>
            </div>
            <div>
                <label>State</label>
                <input
                    type="text"
                    name="state"
                    onChange={updateState}
                    value={state}
                ></input>
            </div>
            <div>
                <label>Bio</label>
                <input
                    type="text"
                    name="bio"
                    onChange={updateBio}
                    value={bio}
                ></input>
            </div>
            <div>
                <label>Profile Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    onChange={updateImageURL}
                    value={imageURL}
                ></input>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default UpdateUserForm;
