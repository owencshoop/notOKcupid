import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { discoverUserLoad, addDislike, addLike } from "../../store/session";
import './DiscoverPage.css';
import heart from '../../assets/heart.png';
import thumb from '../../assets/thumb.png';
import sadPanda from '../../assets/discover-placeholder.png';

export default function Discover() {
    const users = useSelector((state) => state.session.discoverUsers);
    const currentUser = useSelector(state => state.session.user)
    const [loaded, setLoaded] = useState(false);
    const [userNumber, setUserNumber] = useState(0);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

    let usersList = null;

    if (users) {
        usersList = Object.values(users)
    }

    useEffect(() => {
        dispatch(discoverUserLoad()).then(() => setLoaded(true));
    }, [dispatch, loaded]);

    if (!users) {
        return null;
    }

    if (usersList.length === 0) {
        return (
            <>
            <div className="discover-header-container">
            <h1>
            Discover
            </h1>
        </div>
        <div className="discover-page-placeholder">

            <h2 >
                No more users match your preferences, adjust preferences to see
                more.
            </h2>
            <img src={sadPanda} alt='alone-for-now' />
        </div>
            </>
        );
    }


    let user = usersList[userNumber];
    const user1answers = currentUser.userAnswers.filter(answer => answer.answer !== null)
    const user2answers = user.userAnswers.filter(answer => answer.answer !== null)
    let sameQuestionCount = 0.0
    let differentAnswerCount = 0.0
    user1answers.forEach(user1answer => {
        user2answers.forEach(user2answer => {
            if (user1answer.questionId === user2answer.questionId){
                sameQuestionCount += 1
                if (user1answer.answer !== user2answer.answer){
                    differentAnswerCount += 1
                }
            }
        })
    })
    const mismatchPercentage = Math.floor(differentAnswerCount / sameQuestionCount * 100)

    const updateUserNumber = async () => {
        setLoaded(false)
        if (userNumber === usersList.length - 1) {
            setUserNumber(0);
        } else {
            setUserNumber(userNumber + 1);
        }
    };

    const handleDislike = async (e) => {
        e.preventDefault()
        const errors = []
        const newDislike = await dispatch(addDislike(user.id))
        setLoaded(false)

        if (newDislike.errors) {
            newDislike.errors.forEach(error => errors.push(error))
            setErrors(errors)
        }
    }

    const handleLike = async (e) => {
        e.preventDefault()
        const errors = []
        const newLike = await dispatch(addLike(user.id))
        setLoaded(false)

        if (newLike.errors) {
            newLike.errors.forEach(error => errors.push(error))
            setErrors(errors)
        }
    }


    if (!loaded) {
        return (
            <>
            <div className="discover-header-container">
                <h1>
                Discover
                </h1>
            </div>
            <div className="discover-placeholder-div"></div>;
            </>
            )
    }
    if (!user) {
        return (
            <>
            <div className="discover-header-container">
                <h1>
                Discover
                </h1>
            </div>
            <div className="discover-placeholder-div"></div>;
            </>
            )
    }

    return (
        <>
        <div className="discover-header-container">
            <h1>
            Discover
            </h1>
        </div>
        <div className='discover-page-containter'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='discover-page-header'>
                <div className='discover-page-top'>
                    <div className='discover-name-age'>
                    <span>{user.firstName[0].toUpperCase() + user.firstName.slice(1)}{" "}  • {user.age}</span>
                    <span>{user.city}, {user.state}</span>
                    </div>
                    <div className='buttons-container'>
                        {!isNaN(mismatchPercentage) && <div>{mismatchPercentage}</div>}
                        <button className="dislike-button" onMouseUp={handleDislike}><img id='discover-button-icons' src={heart} />Dislike</button>
                        <button className="like-button" onMouseUp={handleLike}><img id='discover-button-icons' src={thumb} />Like</button>
                        <button onMouseUp={updateUserNumber} className='skip-button'>Skip</button>
                    </div>
                </div>
                <img id='discover-image'
                    alt="discover-pic"
                    src={
                        user.userImages[0]
                            ? user.userImages[0].imageUrl
                            : "https://picsum.photos/256/256"
                        }
                        />
            </div>
            <div className='discover-info'>
            <h3 className='info-header'>About {user.firstName}</h3>
            <div className='info'>
                <span>Gender: {user.gender}</span>
                <span>Preferred Genders: {user.preferredGenders}</span>
                <span>Bio: {user.bio}</span>
            </div>
        </div>
        </div>
                        </>
    );
}
