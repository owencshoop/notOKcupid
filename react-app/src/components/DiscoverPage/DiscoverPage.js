import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { discoverUserLoad, addDislike, addLike } from "../../store/session";

export default function Discover() {
    const users = useSelector((state) => state.session.discoverUsers);
    const [loaded, setLoaded] = useState(false);
    const [userNumber, setUserNumber] = useState(0);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(discoverUserLoad()).then(() => setLoaded(true));
    }, [dispatch]);

    if (!users) {
        return null;
    }

    const usersList = Object.values(users);

    let user = usersList[userNumber];

    const updateUserNumber = () => {
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

        if (newDislike.errors){
            newDislike.errors.forEach(error => errors.push(error))
            setErrors(errors)
        }
        updateUserNumber()
    }

    const handleLike = async (e) => {
        e.preventDefault()
        const errors = []
        const newLike = await dispatch(addLike(user.id))

        if (newLike.errors){
            newLike.errors.forEach(error => errors.push(error))
            setErrors(errors)
        }
        updateUserNumber()
    }

    if (usersList.length === 0) {
        return (
            <h3>
                No more users match your preferences, adjust preferences to see
                more.
            </h3>
        );
    }

    if (!loaded) {
        return null;
    }
    if (!user) {
        return null;
    }

    return (
        <>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <button className="dislike-button" onClick={handleDislike}>Dislike</button>
                <button className="like-button" onClick={handleLike}>Like</button>
                <button onClick={updateUserNumber}>Skip</button>
            </div>
            <NavLink to={`/discover/${user.id}`}>
                <img
                    alt="discover-pic"
                    src={
                        user.userImages[0]
                            ? user.userImages[0].imageUrl
                            : "https://picsum.photos/256/256"
                    }
                />
                <p>
                    {user.firstName[0].toUpperCase() + user.firstName.slice(1)}{" "}
                    • {user.age}
                </p>
                <p>Bio: {user.bio}</p>
            </NavLink>
        </>
    );
}
