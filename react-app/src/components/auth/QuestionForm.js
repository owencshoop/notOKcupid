import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateAnswer, authenticate } from '../../store/session';

const QuestionAnswerForm = (userAnswer) => {
    const [loaded, setLoaded] = useState(false);
    const [answer, setAnswer] = useState(userAnswer.answer);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const question = userAnswer.userAnswer.question
    console.log(userAnswer)
    console.log(question)

    const updateNewAnswer = (e) => {
        setAnswer(e.target.value)
    }

    const onAnswer = async (e) => {
        e.preventDefault();
        const data = await dispatch(updateAnswer(userAnswer.id, answer, user.id))
        if (data) {
            setErrors(data)
        }
    };

    useEffect(() => {
        (async() => {
          await dispatch(authenticate());
          setLoaded(true);
        })();
      }, [dispatch]);

      if (!loaded) {
        return null;
      }

    return (
        <form onSubmit={onAnswer}>
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <div>{question?.question}</div>
            <input type='radio' id='answer1' name='answer' value={question?.answer1} onChange={updateNewAnswer}></input>
            <label for='answer1'>{question?.answer1}</label>
            <input type='radio' id='answer2' name='answer' value={question?.answer2} onChange={updateNewAnswer}></input>
            <label for='answer1'>{question?.answer2}</label>
            <button type='submit'>Save</button>
        </form>
    )
}

export default QuestionAnswerForm
