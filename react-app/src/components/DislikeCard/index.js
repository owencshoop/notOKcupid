// import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteDislike } from "../../store/session";
import "./DislikeCard.css";

const DislikeCard = ({ dislike }) => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState([]);

    const handleUndislike = async (e) => {
        e.preventDefault();

        // const errors = {};

         await dispatch(deleteDislike(dislike.id));

        // if (unDislike.errors) {
        //     unDislike.errors.forEach((error) => errors.push(error));
        //     setErrors(errors);
        // }
    };

    return (
        <NavLink to={`/users/${dislike.id}`} className="dislike-card">
            {/* <ul className={errors.length ? "not-hidden" : "hidden"}>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul> */}
            <div className="dislike-img">
                {dislike.gender === 'female' || dislike.gender === 'nonbinary' ?
                <img alt="profile" src={dislike.userImages[0] ? dislike.userImages[0].imageUrl : 'https://xsgames.co/randomusers/assets/avatars/female/45.jpg'} /> :
                <img alt="profile" src={dislike.userImages[0] ? dislike.userImages[0].imageUrl : 'https://xsgames.co/randomusers/assets/avatars/male/45.jpg'} />
                }
            </div>
            <div className="dislike-info-container">
                <div className="dislike-name">{dislike.firstName} </div>
                <div className="dislike-age">{dislike.age}</div>
            </div>
            <button className="delete-dislike" onClick={handleUndislike}>
                Delete Dislike
            </button>
        </NavLink>
    );
};

export default DislikeCard;
