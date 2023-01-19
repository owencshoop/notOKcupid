import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers } from '../../store/allUsers';
import '../ProfilePage/ProfileComponent.css';

function User() {
  const { userId } = useParams()
    const allUsers = useSelector((state) => state.allUsers.users);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const user = allUsers?.filter((user) => user.id === +userId)[0]

    useEffect(() => {
        dispatch(loadUsers())
        .then(() => setLoaded(true));
    }, [dispatch]);

    if (!loaded) {
        return (
            <>
            <div className='top-profile-background'></div>
            <div className='profile-placeholder-div-user'></div>
            </>

        )
    }

    return (
        <div className='profile-container-user'>
        <div className='top-profile-background'>
            <div className='prof-header'>
                <img alt='discover-profile-pic' id='profile-img'
                    src={
                        user.userImages[0]
                            ? user.userImages[0].imageUrl
                            : "https://picsum.photos/256/256"
                    }
                />
                <div className='profile-header-container'>
                    <span id='username'>{user.username}'s Profile</span>
                    <span id='user-location'>{user.age} &middot; {user.city}, {user.state}</span>
                </div>
            </div>
        </div>
        <div className='profile-info'>
            <h3 className='prof-card-header'>About {user.firstName}</h3>
            <div className='the-info'>
                <span>Gender: {user.gender}</span>
                <span>Preferred Genders: {user.preferredGenders}</span>
                <span>Bio: {user.bio}</span>
            </div>
        </div>
    </div >
    );
}
export default User
