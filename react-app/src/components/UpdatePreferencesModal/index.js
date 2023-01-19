import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { discoverUserLoad, updatePreferences } from "../../store/session";
import { useModal } from "../../context/Modal";
import './UpdatePreferences.css'

const UpdatePreferencesForm = () => {
    const user = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const [preferredGenders, setPreferredGenders] = useState(
        user.preferredGenders
    );
    const [minAge, setMinAge] = useState(user.minAge);
    const [maxAge, setMaxAge] = useState(user.maxAge);
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const updatePreferredGenders = (e) => {
        setPreferredGenders(e.target.value);
    };

    const updateMinAge = (e) => {
        setMinAge(e.target.value);
    };

    const updateMaxAge = (e) => {
        setMaxAge(e.target.value);
    };

    const onUpdate = async (e) => {
        e.preventDefault()
        const data = await dispatch(updatePreferences(preferredGenders, minAge, maxAge))
        if (data) {
            setErrors(data);
        }
        await dispatch(discoverUserLoad())
        await closeModal()
    }

    return (
        <div className="pref-user-form-container">
            <div className="pref-form-input-container">
                <h2 className="signup-label" >Update Preferences</h2>
                <form onSubmit={onUpdate} className='update-form'>
                    <div className="errors-div-container">
                        {errors.map((error, ind) => (
                            <div className='errors-div' key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-input-label">Preferred Gender/s</label>
                        <select
                            name="preferredGender"
                            onChange={updatePreferredGenders}
                            require="true"
                            className="signup-input-field"
                        >
                            <option value="male" selected={preferredGenders === 'male'}>Male</option>
                            <option value="female" selected={preferredGenders === 'female'}>Female</option>
                            <option value="nonbinary" selected={preferredGenders === 'nonbinary'}>Nonbinary</option>
                            <option value="male, female" selected={preferredGenders === 'male, female'}>
                                Male and Female
                            </option>
                            <option value="male, female, nonbinary" selected={preferredGenders === 'male, female, nonbinary'}>
                                Male, Female, and Nonbinary
                            </option>
                            <option value="male, nonbinary" selected={preferredGenders === 'male, nonbinary'}>
                                Male and Nonbinary
                            </option>
                            <option value="female, nonbinary" selected={preferredGenders === 'female, nonbinary'}>
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
                    <button type="submit" className="update-pref-button">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePreferencesForm
