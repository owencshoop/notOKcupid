import DislikesTab from "../DislikesTab"
// import { useEffect } from "react"
import { useSelector } from "react-redux"
import './DislikesLikesComponents.css'

const DislikesLikesComponents = () => {
    const currentUser = useSelector(state => state.session.user)

    if (!currentUser) {
        return <div>Loading User Data</div>
    }


    return (
       <div className="dislikes-likes">
        <DislikesTab currentUser={currentUser}/>
       </div>
    )
}

export default DislikesLikesComponents