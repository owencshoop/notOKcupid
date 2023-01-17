import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAnswer, authenticate } from "../../store/session";
const SingleQuestionForm = () => {
    const [loaded, setLoaded] = useState(false);
    // const [answer, setAnswer] = useState("");
    const [errors] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    // const [answerId, setAnswerId] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const userAnswerArray = user?.userAnswers;

    let content = null;

    if (userAnswerArray) {
        content = Object.values(userAnswerArray);
    }

    let unansweredQuestions = content.filter((question) => question.answer === null)


    let question = unansweredQuestions[
        questionNumber
    ];

    const updateQuestionNumber = () => {
        if ((questionNumber === unansweredQuestions.length - 1)) {
            setQuestionNumber(0);
        } else {
            setQuestionNumber(questionNumber + 1);
        }
    };

    console.log(question)
    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }
    if (unansweredQuestions.length === 0) {
      return (
        <div>
          You have answered all the questions
        </div>
      )
    }
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} key={question.id}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>{question?.question.question}</div>
                <input
                    type="radio"
                    id="answer1"
                    name="answer"
                    value={question?.question.answer1}
                    onChange={() => console.log()}
                    onClick={(e) => {
                        dispatch(
                            updateAnswer(question.id, e.target.value, user.id)
                        );
                    }}
                    checked={question.answer === question.question.answer1}
                ></input>
                <label htmlFor="answer1">{question?.question.answer1}</label>
                <input
                    type="radio"
                    id="answer2"
                    name="answer"
                    value={question.question.answer2}
                    onChange={() => console.log()}
                    onClick={(e) => {
                        dispatch(
                            updateAnswer(question.id, e.target.value, user.id)
                        );
                    }}
                    checked={question.answer === question.question.answer2}
                ></input>
                <label htmlFor="answer1">{question.question.answer2}</label>
                <button
                    type="submit"
                    onClick={(e) => {
                        updateQuestionNumber();
                    }}
                >
                    {question.answer ? "Delete Answer" : "Skip"}
                </button>
            </form>
        </div>
    );
};
export default SingleQuestionForm;
