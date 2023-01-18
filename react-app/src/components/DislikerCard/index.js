import { useState } from "react"
import { useDispatch } from "react-redux"
// import { useHistory } from "react-router-dom"
import { addDislike } from "../../store/session"
import './DislikerCard.css'

const DislikerCard = ({ disliker, dislikes }) => {
    const dispatch = useDispatch()
    // const history = useHistory()
    const [errors, setErrors] = useState([])
    // const [renderButton, setRenderButton] = useState(true)

    console.log(disliker)
    console.log(dislikes)
    const isDislike = dislikes.filter(user => user.id === disliker.id)
    console.log(isDislike)
    let renderButton = true;

    if (isDislike.length){
        renderButton = false
    }

    const handleAddDislike = async (e) => {
        e.preventDefault()

        const errors = []

        const newDislike = await dispatch(addDislike(disliker.id))
        
        renderButton = false

        if (newDislike.errors) {
            newDislike.errors.forEach(error => errors.push(error))
            setErrors(errors)
        }
    }

    // const handleProfileRedirect = (e) => {
    //     e.preventDefault()
    //     // history.push(`/users/`)
    // }

    // let isMatched;
    // if 


    return (
        <div className="dislike-card">
            <ul className={errors.length ? "not-hidden" : "hidden"}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="disliker-img">
                <img alt='profile' src={disliker.userImages[0].imageUrl} />
            </div>
            <div className="disliker-name">{disliker.firstName}</div>
            <div className="disliker-age">{disliker.age}</div>
           {renderButton && <button className="add-dislike" onClick={handleAddDislike}>Dislike this User</button>}
        </div>
    )
}

export default DislikerCard
