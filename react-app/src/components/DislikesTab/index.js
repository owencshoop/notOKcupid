import DislikeCard from "../DislikeCard";
import DislikerCard from "../DislikerCard";
import { useState } from "react";

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
                {dislikes.map((dislike) => (
                    <DislikeCard dislike={dislike} key={dislike.id} />
                ))}
            </div>
        );
    } else {
        pageCards = (
            <div className="disliked-you">
                <h3>People Who Disliked You:</h3>
                {dislikedYou.map((disliker) => (
                    <DislikerCard disliker={disliker} key={disliker.id} />
                ))}
            </div>
        );
    }

    return (
        <div className="dislikes-components">
            <h1>Dislikes</h1>
            <button className="dislikes-tab" onClick={dislikesClick}>
                Your Dislikes
            </button>
            <button className="dislikes-tab" onClick={dislikersClick}>
                Disliked You
            </button>
            {pageCards}
        </div>
    );
};

export default DislikesTab;
