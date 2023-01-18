import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMismatches, sendMessage } from "../../store/mismatchReducer";
import './MismatchMessage.css'

export default function MismatchMessages() {
    const { mismatchId } = useParams()
    const user = useSelector(state => state.session.user)
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])
    const mismatches = Object.values(useSelector((state) => state.mismatches));
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getMismatches(user.id))
        .then(() => setLoaded(true));
    }, [dispatch]);

    const singleMismatch = Object.values(mismatches).filter(mismatch => mismatch.id === +mismatchId)
    const mismatch = singleMismatch[0]

    if (!loaded) {
        return null;
    }

    const onMessageSubmit = async (e) => {
      e.preventDefault()
      const data = await dispatch(sendMessage(mismatchId, message))
      if (data) {
        setErrors(data)
      }
      setMessage('')
    }

    return (
       <div id='chat-container'>
        <div id='chat-box'>
          {mismatch.messages.length > 0 ? mismatch.messages.map(message => (
              <div className="date-and-text">
                <div className={message.sender === user.id ? 'sent' : 'received'}>{message.text}</div>
                <div className={message.sender === user.id ? 'time-sent' : 'time-received'}>{message.dateTime}</div>
              </div>
            )) : (
              <p>No messages yet, start the conversation.</p>
              )}
        </div>
        <form onSubmit={onMessageSubmit}>
        <label>Message</label>
        <input
          required={true}
          type='text'
          name='message'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></input>
        <button type='submit'>Send</button>
        </form>
       </div>
    );
}
