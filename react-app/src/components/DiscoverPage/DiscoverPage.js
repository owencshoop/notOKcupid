import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { discoverUserLoad, addDislike, addLike } from "../../store/session";

export default function Discover() {
    const users = useSelector((state) => state.session.discoverUsers);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(discoverUserLoad()).then(() => setLoaded(true));
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    
    const userComponents = Object.values(users)?.map((user) => {
        const handleDislike = async (e) => {
            e.preventDefault()
            const errors = []
            const newDislike = await dispatch(addDislike(user.id))

            if (newDislike.errors){
                newDislike.errors.forEach(error => errors.push(error))
                setErrors(errors)
            }
        }
        const handleLike = async (e) => {
            e.preventDefault()
            const errors = []
            const newLike = await dispatch(addLike(user.id))

            if (newLike.errors){
                newLike.errors.forEach(error => errors.push(error))
                setErrors(errors)
            }
        }


        return (
            <div key={user.id}>
                <div>
                    {user.username}: {user.firstName}
                </div>
                <button className="dislike-button" onClick={handleDislike}>Dislike</button> 
                <button className="like-button" onClick={handleLike}>Like</button> 
            </div>
        );
    });

    return (
        <div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            {userComponents}
        </div>
    );
}
