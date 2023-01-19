import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteUser } from "../../store/session";
import './DeleteProfileModal.css'

export default function DeleteProfileModal() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const deleteProfile = async (e) => {
        e.preventDefault()
        if (user.id === 1 || user.id === 9){
            await closeModal()
            window.alert('This user cannot be deleted.')
            return null
        } else {
            await dispatch(deleteUser())
            await closeModal()
    }
    }

    return (
        <div className="delete-user-profile-container">
            <h3 className="delete-profile-header">Are you sure you want to delete your profile?</h3>
            <div className="delete-buttons-container">
                <button onClick={deleteProfile} className='delete-profile-button'>Yes, Delete Profile</button>
                <button onClick={closeModal} className='delete-profile-button'>Cancel</button>
            </div>
        </div>
    )
}
