import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMismatches, sendMessage } from "../../store/mismatchReducer";
import './MismatchMessage.css'
import reload from '../../assets/reload-image.png'
import send from '../../assets/send-arrow.png'

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

    console.log(mismatch)

    const onMessageSubmit = async (e) => {
      e.preventDefault()
      const data = await dispatch(sendMessage(mismatchId, message))
      if (data) {
        setErrors(data)
      }
      setMessage('')
    }

    const onReloadClick = async (e) => {
      dispatch(getMismatches(user.id))
      .then(() => setLoaded(true));
    }


    return (
      <>
      <h1 id='chat-intro-bit'>Chat with {mismatch.user1Id !== user.id ? mismatch.user1.firstName : mismatch.user2.firstName}</h1>
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
            <div className="chat-input-field">
          <input
            id="text-input-for-messages"
            required={true}
            type='text'
            name='message'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            ></input>
          <img onClick={onReloadClick} src={reload} alt='Reload messages' id='reload-message-icon'/>
          <button type='submit' id='send-arrow-icon'>
            <img src={send} alt='Send button' id='send-arrow-icon' />
          </button>
            </div>
          </form>
       </div>
      </>
    );
}
