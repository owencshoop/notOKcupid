import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { discoverUserLoad } from '../store/session';

export default function Discover() {
    const users = useSelector(state => state.session.discoverUsers)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(discoverUserLoad())
        .then(() => setLoaded(true))
    }, [dispatch])

    if (!loaded) {
        return null;
    }

    const userComponents = Object.values(users)?.map((user) => {
        return (
          <li key={user.id}>
            <p>{user.username}: {user.firstName}</p>
          </li>
        );
      });

    return (
        <div>
            <ul>{userComponents}</ul>
        </div>
    )
}
