import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMismatches } from "../../store/mismatchReducer";
import "./mismatches.css";
import mismatchPH from '../../assets/mismatch-placeholder.png';

export default function Mismatches() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const mismatches = Object.values(useSelector((state) => state.mismatches));
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getMismatches(user.id))
        .then(()=> setLoaded(true))
    }, [dispatch, user.id]);

    if (!loaded) {
        return (
            <>
            <div className="mismatch-header-container">
                <h1>
                Mismatches
                </h1>
            </div>
            <div className="mismatch-page-placeholder-div"></div>
            </>
        )
    }

    if (loaded && !mismatches.length)
        return (
        <>
        <div className="mismatch-header-container">
            <h1>
            Mismatches
            </h1>
        </div>
        <div className="mismatch-page-placeholder">
            <h2 className="mismatch-catch-message">You're too likeable.</h2>
            <img src={mismatchPH} alt='too-cool-to-match' />
        </div>
        </>
    );

    const mismatch_info = mismatches.map((mismatch) => {
        if (mismatch.user1Id === user.id) {
            const user1answers = mismatch.user1.userAnswers.filter(answer => answer.answer !== null)
            const user2answers = mismatch.user2.userAnswers.filter(answer => answer.answer !== null)
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

            return (
                <div className="mismatch-navlink-container" key={mismatch.id}>
                    <NavLink to={`/mismatches/${mismatch.id}`} className='mismatch-navlink' >
                        <div className="mismatch-image-container">
                            <img
                                src={
                                    mismatch.user2.userImages[0]
                                        ? mismatch.user2.userImages[0].imageUrl
                                        : "https://picsum.photos/256/256"
                                    }
                                alt='profile'
                                className='mismatch-image'
                            ></img>
                        </div>
                        <div className="mismatch-info-container">
                            <div className="mismatch-first-name">
                                {mismatch.user2.firstName} {mismatchPercentage ? ` - ${mismatchPercentage}%` : ' - loading...'}
                            </div>
                            <div className="mismatch-message">
                                {mismatch.messages.length > 0
                                    ? mismatch.messages[
                                          mismatch.messages.length - 1
                                      ].text
                                    : `You've mismatched! Send ${mismatch.user2.firstName} a message!`}
                            </div>
                        </div>
                    </NavLink>
                </div>
            );
        } else {
            const user1answers = mismatch.user1.userAnswers.filter(answer => answer.answer !== null)
            const user2answers = mismatch.user2.userAnswers.filter(answer => answer.answer !== null)
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

            return (
                <div className="mismatch-navlink-container" key={mismatch.id}>
                    <NavLink to={`/mismatches/${mismatch.id}`} className='mismatch-navlink' >
                        <div className="mismatch-image-container">
                            <img
                                src={
                                    mismatch.user1.userImages[0]
                                        ? mismatch.user1.userImages[0].imageUrl
                                        : "https://picsum.photos/256/256"
                                }
                                alt='profile'
                                className='mismatch-image'
                            ></img>
                        </div>
                        <div className="mismatch-info-container">
                            <div className="mismatch-first-name">
                                {mismatch.user1.firstName} {mismatchPercentage ? ` - ${mismatchPercentage}%` : ' - loading...'}
                            </div>
                            <div className="mismatch-message">
                                {mismatch.messages.length > 0
                                    ? mismatch.messages[
                                          mismatch.messages.length - 1
                                      ].text
                                    : `You've mismatched! Send ${mismatch.user1.firstName} a message!`}
                            </div>
                        </div>
                    </NavLink>
                </div>
            );
        }
    });

    return (
        <>
        <div className="mismatch-header-container">
            <h1>
            Mismatches
            </h1>
            </div>
        <div className="all-mismatch-container">{mismatch_info}</div>;
        </>
        )
}
