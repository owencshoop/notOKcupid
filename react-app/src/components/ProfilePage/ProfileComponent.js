import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleQuestionForm from "../Questions/SingleQuestionForm";
import { discoverUserLoad } from "../../store/session";
import { NavLink } from "react-router-dom";
import './ProfileComponent.css';
import pencil from '../../assets/pencil.png'

export default function ProfilePage() {
    const user = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(discoverUserLoad())
            .then(() => setLoaded(true))
    }, [dispatch])

    if (!loaded) {
        return null;
    }

    return (
        <div className='profile-container'>
            <NavLink to='/profile/update' className='top-profile-background'>
                <div className='prof-header'>
                    <img id='profile-img'
                        src={
                            user.userImages[0]
                                ? user.userImages[0].imageUrl
                                : "https://picsum.photos/256/256"
                        }
                        alt='profile-pic'
                    />
                    <div className='header-container'>
                        <div className='name-update'>
                            <span id='username'>{user.username}</span>
                            <img id='pencil' src={pencil} />
                        </div>
                        <span id='user-location'>{user.city}, {user.state}</span>
                    </div>
                </div>
            </NavLink>
            <h3>Name: {user.firstName}</h3>
            <p>Gender: {user.gender}</p>
            <p>Preferred Genders: {user.preferredGenders}</p>
            <p>
                Age range: {user.minAge} - {user.maxAge}
            </p>
            <p>Bio: {user.bio}</p>

            <div>
                <h4>Answer more questions</h4>
                <SingleQuestionForm />
            </div>

        </div>
    );
}
