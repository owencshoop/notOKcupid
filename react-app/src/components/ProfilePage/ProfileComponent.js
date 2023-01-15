import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/session';

export default function ProfilePage() {
    const user = useSelector(state => state.session.user)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()

    console.log(user)

    useEffect(() => {
        dispatch(authenticate())
        .then(() => setLoaded(true))
    }, [dispatch])

    if (!loaded) {
        return null;
    }



    return (
        null
    )
}
