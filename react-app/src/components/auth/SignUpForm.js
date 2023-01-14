import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [gender, setGender] = useState('')
  const [preferredGenders, setPreferredGenders] = useState('')
  const [minAge, setMinAge] = useState('')
  const [maxAge, setMaxAge] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [radius, setRadius] = useState('')
  const [bio, setBio] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
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
    setFirstName(e.target.value)
  }

  const updateGender = (e) => {
    setGender(e.target.value)
  }

  const updatePreferredGenders = (e) => {
    setPreferredGenders(e.target.value)
  }

  const updateMinAge = (e) => {
    setMinAge(e.target.value)
  }

  const updateMaxAge = (e) => {
    setMaxAge(e.target.value)
  }

  const updateZipCode = (e) => {
    setZipCode(e.target.value)
  }

  const updateRadius = (e) => {
    setRadius(e.target.value)
  }

  const updateBio = (e) => {
    setBio(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
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
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          required={true}
        ></input>
      </div>
      <div>
        <label>Gender</label>
        <select
          name='gender'
          onChange={updateGender}
          required={true}
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='nonbinary'>Nonbinary</option>
        </select>
      </div>
      <div>
        <label>Preferred Gender/s</label>
        <select
          name='preferredGender'
          onChange={updatePreferredGenders}
          require={true}
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='nonbinary'>Nonbinary</option>
          <option value='male, female'>Male and Female</option>
          <option value='male, female, nonbinary'>Male, Female, and Nonbinary</option>
          <option value='male, nonbinary'>Male and Nonbinary</option>
          <option value='female, nonbinary'>Female and Nonbinary</option>
        </select>
      </div>
      <div>
        <label>Minimum Age</label>
        <input
          type='range'
          name='minAge'
          min='18'
          max='100'
          onChange={updateMinAge}
          value={minAge}
        ></input>
      </div>
      <div>
        <label>Maximum Age</label>
        <input
          type='range'
          name='maxAge'
          min={minAge}
          max='100'
          onChange={updateMaxAge}
          value={maxAge}
        ></input>
      </div>
      <div>
        <label>Zip Code</label>
        <input
          type='number'
          name='zipCode'
          onChange={updateZipCode}
          value={zipCode}
        ></input>
      </div>
      <div>
        <label>Distance</label>
        <input
          type='range'
          name='radius'
          min='1'
          max='250'
          onChange={updateRadius}
          value={radius}
        ></input>
      </div>
      <div>
        <label>Bio</label>
        <input
          type='text'
          name='bio'
          onChange={updateBio}
          value={bio}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
