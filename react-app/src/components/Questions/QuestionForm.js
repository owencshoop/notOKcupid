import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAnswer, authenticate } from "../../store/session";
import './questions.css';

const QuestionAnswerForm = () => {
    const [loaded, setLoaded] = useState(false);
    // const [answer, setAnswer] = useState("");
    const [errors] = useState([]);
    // const [answerId, setAnswerId] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const userAnswerArray = user?.userAnswers;
    let content = null;
    if (userAnswerArray) {
        content = Object.values(userAnswerArray);
    }

    // const updateNewAnswer = async (e) => {
    //     setAnswer(e.target.value)
    //     console.log(answerId)
    //     const data = await dispatch(updateAnswer(answerId, answer, user.id))
    // };

    // const onAnswer = async (e) => {
    //     e.preventDefault();
    //     const data = await dispatch(updateAnswer(answerId, answer, user.id));
    //     if (data) {
    //         setErrors(data);
    //     }
    // };

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    let userQuestionCount = 0
    user.userAnswers.forEach(answer => {
        if (answer.answer != null) userQuestionCount += 1;
    });

    let unanswered = 0
    user.userAnswers.forEach(answer => {
        if (answer.answer === null) unanswered += 1;
    });

    return (
        <>
            <div className="question-header-container">
                <h1>Questions</h1>
            </div>
            <div className='questions-container'>
                <div className='question-stats-container'>
                    <span>Answered Questions</span>
                    <div className='question-count'>{userQuestionCount}</div>
                    <span>Unanswered Questions</span>
                    <div className='unanswered-count'>{unanswered}</div>
                    <span>The more questions you answer the higher your chances to get matched!</span>
                </div>
                {/* {content.map((question) => (
                <form className='questions-form' onSubmit={(e) => e.preventDefault()} key={question.id}>
                    <div>
                    {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className='question-cards'>
                        <div id='question'>{question.question.question}</div>
                        <div className='input-containter'>
                            <div id='answers'>
                            <input
                            type="radio"
                                    id="answer1"
                                    name="answer"
                                    value={question.question.answer1}
                                    onChange={() => console.log()}
                                    onClick={(e) => {
                                        dispatch(updateAnswer(question.id, e.target.value, user.id))
                                    }}
                                    checked={question.answer === question.question.answer1}
                                ></input>
                                <label htmlFor="answer1">{question.question.answer1}</label>
                                </div>
                            <div id='answers'>
                                <input
                                type="radio"
                                id="answer2"
                                    name="answer"
                                    value={question.question.answer2}
                                    onChange={() => console.log()}
                                    onClick={(e) => {
                                        dispatch(updateAnswer(question.id, e.target.value, user.id))
                                    }}
                                    checked={question.answer === question.question.answer2}
                                    ></input>
                                <label htmlFor="answer1">{question.question.answer2}</label>
                            </div>
                        </div> */}

                {content.map((question) => (
                    <form className='questions-form' onSubmit={(e) => e.preventDefault()} key={question.id}>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className='question-cards'>
                            <div id='question'>{question.question.question}</div>
                            <div className='input-containter'>
                                <div id='answers'>
                                    <button
                                        id="answer1"
                                        name="answer"
                                        value={question.question.answer1}
                                        onClick={(e) => {
                                            dispatch(updateAnswer(question.id, e.target.value, user.id))
                                        }}
                                        className={question.answer === question.question.answer1 ? 'current-answer' : 'button-option'}
                                    >{question.question.answer1}</button>
                                </div>
                                <div id='answers'>
                                    <button
                                        id="answer2"
                                        name="answer"

                                        value={question.question.answer2}
                                        onClick={(e) => {
                                            dispatch(updateAnswer(question.id, e.target.value, user.id))
                                        }}
                                        className={question.answer === question.question.answer2 ? 'current-answer' : 'button-option'}
                                    >{question.question.answer2}</button>
                                </div>
                            </div>
                            {question.answer ?
                                <>
                                    <li className="question-divider"></li>
                                    <div className='question-button-container'>
                                        <button className='question-button'
                                            type="submit"
                                            onClick={(e) => {
                                                dispatch(updateAnswer(question.id, null, user.id))
                                            }}
                                        >
                                            Delete Answer
                                        </button>
                                    </div>
                                </>
                                : null}
                        </div>
                    </form>
                ))}
            </div>
        </>
    );
};

export default QuestionAnswerForm;
