import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateAnswer, authenticate } from '../../store/session';

const QuestionAnswerForm = () => {
    const [loaded, setLoaded] = useState(false);
    const [answer, setAnswer] = useState('');
    const [errors, setErrors] = useState([]);
    const [answerId, setAnswerId] = useState('')
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const userAnswerArray = user?.userAnswers
    let content = null
    if (userAnswerArray){
        content = Object.values(userAnswerArray)
    }

    const updateNewAnswer = (e) => {
        setAnswer(e.target.value)
    }

    const onAnswer = async (e) => {
        e.preventDefault();
        console.log(answerId)
        const data = await dispatch(updateAnswer(answerId, answer, user.id))
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
        <div>
            {content.map(question => (
                <form onSubmit={onAnswer} value={question.id}>
                    <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div>{question?.question.question}</div>
                    <input type='radio' id='answer1' name='answer' value={question?.question.answer1} onChange={updateNewAnswer}></input>
                    <label for='answer1'>{question?.question.answer1}</label>
                    <input type='radio' id='answer2' name='answer' value={question?.question.answer2} onChange={updateNewAnswer}></input>
                    <label for='answer1'>{question?.question.answer2}</label>
                    <button type='submit' onClick={() => setAnswerId(question.id)}>Save</button>
                </form>
            ))}
        </div>
    )
}

export default QuestionAnswerForm
