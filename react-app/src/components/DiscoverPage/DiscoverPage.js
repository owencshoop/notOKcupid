import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { discoverUserLoad, addDislike, addLike } from "../../store/session";
import './DiscoverPage.css';

export default function Discover() {
    const users = useSelector((state) => state.session.discoverUsers);
    const [loaded, setLoaded] = useState(false);
    const [userNumber, setUserNumber] = useState(0);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

    let usersList = null;

    if (users) {
        usersList = Object.values(users)
    }

    useEffect(() => {
        dispatch(discoverUserLoad()).then(() => setLoaded(true));
    }, [dispatch, loaded]);

    if (!users) {
        return null;
    }

    if (usersList.length === 0) {
        return (
            <h3 className="discover-page-containter">
                No more users match your preferences, adjust preferences to see
                more.
            </h3>
        );
    }


    let user = usersList[userNumber];

    const updateUserNumber = async () => {
        setLoaded(false)
        if (userNumber === usersList.length - 1) {
            setUserNumber(0);
        } else {
            setUserNumber(userNumber + 1);
        }
    };

    const handleDislike = async (e) => {
        e.preventDefault()
        const errors = []
        const newDislike = await dispatch(addDislike(user.id))
        setLoaded(false)

        if (newDislike.errors) {
            newDislike.errors.forEach(error => errors.push(error))
            setErrors(errors)
        }
    }

    const handleLike = async (e) => {
        e.preventDefault()
        const errors = []
        const newLike = await dispatch(addLike(user.id))
        setLoaded(false)

        if (newLike.errors) {
            newLike.errors.forEach(error => errors.push(error))
            setErrors(errors)
        }
    }


    if (!loaded) {
        return null;
    }
    if (!user) {
        return null;
    }

    return (
        <div className='discover-page-containter'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='discover-page-header'>
                <div className='discover-page-top'>
                    <div>
                    <span>{user.firstName[0].toUpperCase() + user.firstName.slice(1)}{" "}</span>
                    <span>{user.age} • {user.city}, {user.state}</span>
                    </div>
                    <div className='buttons-containers'>
                        <button className="dislike-button" onMouseUp={handleDislike}>Dislike</button>
                        <button className="like-button" onMouseUp={handleLike}>Like</button>
                        <button onMouseUp={updateUserNumber} className='skip-button'>Skip</button>
                    </div>
                </div>
                <img
                    alt="discover-pic"
                    src={
                        user.userImages[0]
                            ? user.userImages[0].imageUrl
                            : "https://picsum.photos/256/256"
                    }
                />
            </div>
            <div className='discover-info'>
            <h3 className='info-header'>About {user.firstName}</h3>
            <div className='info'>
                <span>Gender: {user.gender}</span>
                <span>Preferred Genders: {user.preferredGenders}</span>
                <span>Bio: {user.bio}</span>
            </div>
        </div>
        </div>
    );
}
