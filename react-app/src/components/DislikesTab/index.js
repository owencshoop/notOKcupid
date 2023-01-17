import DislikeCard from "../DislikeCard";
import DislikerCard from "../DislikerCard";
import { useState } from "react";
import './DislikesTab.css'

const DislikesTab = ({ currentUser }) => {
    const [isUserDislikes, setIsUserDislikes] = useState(true);

    const dislikes = currentUser.dislikes;
    const dislikedYou = currentUser.dislikedUser;

    const dislikesClick = (e) => {
        e.preventDefault();
        setIsUserDislikes(true);
    };
    const dislikersClick = (e) => {
        e.preventDefault();
        setIsUserDislikes(false);
    };

    let pageCards;
    if (isUserDislikes) {
        pageCards = (
            <div className="your-dislikes">
                <h3>People You have Disliked:</h3>
                <div className="cards-container">
                {dislikes.map((dislike) => (
                    <DislikeCard dislike={dislike} key={dislike.id} />
                ))}
                </div>

            </div>
        );
    } else {
        pageCards = (
            <div className="disliked-you">
                <h3>People Who Disliked You:</h3>
                <div className="cards-container">
                {dislikedYou.map((disliker) => (
                    <DislikerCard disliker={disliker} key={disliker.id} />
                ))}
                </div>

            </div>
        );
    }

    return (
        <div className="dislikes-components">
            <h1>Dislikes</h1>
            <div className="dislikes-tabs">
            <button onClick={dislikesClick}>
                Your Dislikes
            </button>
            <button onClick={dislikersClick}>
                Disliked You
            </button>
            </div>
            {pageCards}
        </div>
    );
};

export default DislikesTab;
