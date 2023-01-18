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
                    <DislikerCard disliker={disliker} dislikes={dislikes} key={disliker.id} />
                ))}
                </div>

            </div>
        );
    }

    return (
        <div className="dislikes-components">
            <div className="dislikes-header">
                <div className="dislikes-header-parts">
                    <h1>Dislikes</h1>

                    <div className="dislikes-tabs">
                        <button id={isUserDislikes ? "selected-tab" : ""} onClick={dislikesClick}>
                        Your Dislikes
                    </button>
                        <button id={isUserDislikes ? "" : "selected-tab"} onClick={dislikersClick}>
                        Disliked You
                    </button>
                    </div>       
                </div>
            </div>
            {pageCards}
        </div>
    );
};


export default DislikesTab;
