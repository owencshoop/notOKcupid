import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {deleteMismatch} from '../../store/mismatchReducer';
import './DeleteProfileModal.css'

export default function DeleteProfileModal() {
    const mismatch = useSelector
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const deleteProfile = async (e) => {
        e.preventDefault()
            await dispatch(deleteMismatch())
            await closeModal()

    }

    return (
        <div className="delete-mismatch-profile-container">
            <h3 className="delete-profile-header">Are you sure you want to delete your profile?</h3>
            <div className="delete-buttons-container">
                <button onClick={deleteProfile} className='delete-profile-button'>Yes, Delete Profile</button>
                <button onClick={closeModal} className='delete-profile-button'>Cancel</button>
            </div>
        </div>
    )
}
