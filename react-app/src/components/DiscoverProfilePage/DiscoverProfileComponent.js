import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { discoverUserLoad } from "../../store/session";

export default function DiscoverProfilePage() {
    const { discoverId } = useParams()
    const discoverUsers = useSelector((state) => state.session.discoverUsers);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const discoverUser = Object.values(discoverUsers).filter((user) => user.id === +discoverId)[0]

    useEffect(() => {
        dispatch(discoverUserLoad())
        .then(() => setLoaded(true));
    }, [dispatch]);

    console.log(discoverUser[0])
    if (!loaded) {
        return null;
    }

    return (
        <div>

            <h1>{discoverUser.username}'s Profile</h1>
            <img
                src={
                    discoverUser.userImages[0]
                        ? discoverUser.userImages[0].imageUrl
                        : "https://picsum.photos/256/256"
                }
            />
            <h3>Name: {discoverUser.firstName}</h3>
            <p>Gender: {discoverUser.gender}</p>
            <p>Preferred Genders: {discoverUser.preferredGenders}</p>
            <p>
                Age range: {discoverUser.minAge} - {discoverUser.maxAge}
            </p>
            <p>Bio: {discoverUser.bio}</p>
        </div>
    );
}
