import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleQuestionForm from "../Questions/SingleQuestionForm";
import { discoverUserLoad } from "../../store/session";
import { NavLink } from "react-router-dom";
import './ProfileComponent.css';
import pencil from '../../assets/pencil.png';

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

    let userQuestionCount = 0
    user.userAnswers.forEach(answer => {
        if (answer.answer != null) userQuestionCount += 1;
    });


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
                    <div className='profile-header-container'>
                        <div className='name-update'>
                            <span id='username'>{user.username}</span>
                            <img id='pencil' src={pencil} />
                        </div>
                        <span id='user-location'>{user.city}, {user.state}</span>
                    </div>
                </div>
            </NavLink>
            <div className='profile-info'>
                <h3 className='prof-card-header'>Your Preferences</h3>
                <div className='the-info'>
                    <span>Name: {user.firstName}</span>
                    <span>Gender: {user.gender}</span>
                    <span>Preferred Genders: {user.preferredGenders}</span>
                    <span>Age range: {user.minAge} - {user.maxAge}</span>
                </div>
            </div>
            <div className='profile-info'>
                <h3 className='prof-card-header'>About you</h3>
                <div className='the-info'>
                    <span>{user.bio}</span>
                </div>
            </div>
            <div className='profile-info'>
                <h3 className='prof-card-header'>Questions answered</h3>
                <div className='count-box'>
                <div id='question-count'>{userQuestionCount}</div>
                <span>Tip: Answer more questions to improve your Mismatch % with people on notOKcupid.</span>
                </div>
            </div>
            <div className='profile-info'>
                <h3 className='prof-card-header'>Highest possible mismatch</h3>
                <div>
                <span>Your highest possible match based on the questions you have answered.</span>
                </div>
            </div>
            <div className='profile-info-questions'>
                <div>
                    <h3 className='prof-card-header3'>Answer more questions</h3>
                    <SingleQuestionForm />
                </div>
            </div>
        </div >
    );
}
