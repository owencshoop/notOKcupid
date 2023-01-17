import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMismatches, sendMessage } from "../../store/mismatchReducer";

export default function MismatchMessages() {
    const { mismatchId } = useParams()
    const user = useSelector(state => state.session.user)
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])
    const mismatches = Object.values(useSelector((state) => state.mistmatches));
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
       <div>
        {mismatch.messages.length > 0 ? mismatch.messages.map(message => (
          <p>{message.text}</p>
        )) : (
          <p>No messages yet, start the conversation.</p>
        )}
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
