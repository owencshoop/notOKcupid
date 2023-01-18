import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { discoverUserLoad, addDislike, addLike } from "../../store/session";
import '../ProfilePage/ProfileComponent.css';

export default function DiscoverProfilePage() {
    const { discoverId } = useParams()
    const discoverUsers = useSelector((state) => state.session.discoverUsers);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();


    let discoverUser = null
    if (discoverUsers) {
        discoverUser = Object.values(discoverUsers).filter((user) => user.id === +discoverId)[0]
    }


    useEffect(() => {
        dispatch(discoverUserLoad())
            .then(() => setLoaded(true));
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <div className='profile-container'>
            <div className='top-profile-background'>
                <div className='prof-header'>
                    <img alt='discover-profile-pic' id='profile-img'
                        src={
                            discoverUser.userImages[0]
                                ? discoverUser.userImages[0].imageUrl
                                : "https://picsum.photos/256/256"
                        }
                    />
                    <div className='profile-header-container'>
                        <span id='username'>{discoverUser.username}'s Profile</span>
                        <span id='user-location'>{discoverUser.age} &middot; {discoverUser.city}, {discoverUser.state}</span>
                    </div>
                </div>
            </div>
            <div className='profile-info'>
                <button>Delete mismatch</button>
            </div>
            <div className='profile-info'>
                <h3 className='prof-card-header'>About {discoverUser.firstName}</h3>
                <div className='the-info'>
                    <span>Gender: {discoverUser.gender}</span>
                    <span>Preferred Genders: {discoverUser.preferredGenders}</span>
                    <span>Bio: {discoverUser.bio}</span>
                </div>
            </div>
        </div >
    );
}
