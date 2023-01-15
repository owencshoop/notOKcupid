import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/session';
import SingleQuestionForm from '../auth/SingleQuestionForm';

export default function ProfilePage() {
    const user = useSelector(state => state.session.user)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(authenticate())
        .then(() => setLoaded(true))
    }, [dispatch])

    if (!loaded) {
        return null;
    }



    return (
        <div>
          <h1>{user.username}'s Profile</h1>
          <img src={user.userImages[0].imageUrl} />
          <h3>Name: {user.firstName}</h3>
          <p>Gender: {user.gender}</p>
          <p>Preferred Genders: {user.preferredGenders}</p>
          <p>Age range: {user.minAge} - {user.maxAge}</p>

          <div>
            <h4>Answer more questions</h4>
              <SingleQuestionForm />
          </div>
        </div>
    )
}