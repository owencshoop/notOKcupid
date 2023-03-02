import { useModal } from "../../context/Modal";
import './InformationModal.css'

const InformationModal = () => {
    const { closeModal } = useModal();

    return (
        <div className='info-modal'>
            <h1>Welcome to <span>notOKcupid</span>!</h1>
            <div className="discover-blurb">
                <h2>Liking is boring.</h2>
                <p>
                    <strong>Dislike</strong> Users to create <strong>Mismatches</strong>. Liking will remove
                    Users from your <strong>Discover</strong> feed, but we won't let you
                    talk to them... yet!
                </p>
                <h2>Check out your Dislikes</h2>
                <p>
                    To see people you have <strong>disliked</strong>, and people who have disliked you!
                </p>
                <h2>Answer personality questions</h2>
                <p>
                    To see your <strong>incompatibility</strong> ratings with other users.
                </p>
                <h2>Chat with your Mismatches</h2>
                <p>
                    <strong>Connect with someone different for a change!</strong>
                </p>
            </div>
            <button className="info-modal-button" onClick={closeModal}>Take me there</button>
        </div>
    )
}

export default InformationModal;