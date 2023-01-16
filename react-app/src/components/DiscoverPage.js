import React, {useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { discoverUserLoad } from '../store/session';

export default function Discover() {
    const users = useSelector(state => state.session.discoverUsers)
    const [loaded, setLoaded] = useState(false);
    const [userNumber, setUserNumber] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(discoverUserLoad())
        .then(() => setLoaded(true))
    }, [dispatch])

    if (!users) {
      return null
    }

    const usersList = Object.values(users)

    let user = usersList[
      userNumber
    ];

    const updateUserNumber = () => {
      if ((userNumber === usersList.length - 1)) {
        setUserNumber(0);
    } else {
        setUserNumber(userNumber + 1);
    }
    }

    if (usersList.length === 0) {
      return (
        <h3>No more users match your preferences, adjust preferences to see more.</h3>
      )
    }
    if (!loaded) {
        return null;
    }
    if (!user) {
      return null;
    }


    return (
      <>
        <div>
        <button onClick={updateUserNumber}>Dislike</button>
        <button onClick={updateUserNumber}>Like</button>
        <button onClick={updateUserNumber}>Skip</button>
        </div>
          <NavLink to={`/discover/${user.id}`}>
            <img src={user.userImages[0] ? user.userImages[0].imageUrl : "https://picsum.photos/256/256"} />
            <p>{user.firstName[0].toUpperCase() + user.firstName.slice(1)} • {user.age}</p>
            <p>Bio: {user.bio}</p>
          </NavLink>
      </>
    )
}
