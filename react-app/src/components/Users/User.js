import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers } from '../../store/allUsers';

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
        return null;
    }

    return (
        <div>

            // <h1>{user.username}'s Profile</h1>
            // <img alt='discover-profile-pic'
                src={
                    user.userImages[0]
                        ? user.userImages[0].imageUrl
                        : "https://picsum.photos/256/256"
                }
            />
            <h3>Name: {user.firstName}</h3>
            <p>Gender: {user.gender}</p>
            <p>Preferred Genders: {user.preferredGenders}</p>
            <p>
                Age range: {user.minAge} - {user.maxAge}
            </p>
            <p>Bio: {user.bio}</p>
        </div>
    );
}
export default User
