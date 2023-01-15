import DislikeCard from "../DislikeCard"


const DislikesTab = ({currentUser}) => {

    const dislikes = currentUser.dislikes

    return (
        <div className="dislikes-components">
            <h1>Dislikes</h1>
            <div className="your-dislikes">
                <h3>People you have Disliked:</h3>
                {dislikes.map(dislike => (
                    <DislikeCard dislike={dislike} key={dislike.id}/>
                ))}
            </div>

        </div>
    )
}

export default DislikesTab