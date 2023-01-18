import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDislike } from "../../store/session";
import './DislikeCard.css'

const DislikeCard = ({ dislike }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const handleUndislike = async (e) => {
        e.preventDefault();

        const errors = {};

        const unDislike = await dispatch(deleteDislike(dislike.id));

        if (unDislike.errors) {
            unDislike.errors.forEach((error) => errors.push(error));
            setErrors(errors);
        }
    };

    return (
        <div className="dislike-card">
            <ul className={errors.length ? "not-hidden": "hidden"}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="dislike-img">
                <img alt='profile' src={dislike.userImages[0].imageUrl} />
            </div>
            <div className="dislike-name">{dislike.firstName}</div>
            <div className="dislike-age">{dislike.age}</div>
            <button className="delete-dislike" onClick={handleUndislike}>Delete Dislike</button>
        </div>
    );
};

export default DislikeCard;
