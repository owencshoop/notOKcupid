import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMismatches } from "../../store/mismatchReducer";
import "./mismatches.css";
import mismatchPH from '../../assets/mismatch-placeholder.png';

export default function Mismatches() {
    const dispatch = useDispatch();
    const mismatches = Object.values(useSelector((state) => state.mismatches));
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getMismatches(user.id));
    }, [dispatch]);

    if (!mismatches.length) return (
        <>
        <div className="mismatch-header-container">
            <h1>
            Mismatches
            </h1>
        </div>
        <div className="mismatch-page-placeholder">
            <h2 className="mismatch-catch-message">You're too likeable.</h2>
            <img src={mismatchPH} alt='too-cool-to-match' />
        </div>
        </>
    );

    const mismatch_info = mismatches.map((mismatch) => {
        if (mismatch.user1Id === user.id) {
            return (
                <div className="mismatch-navlink-container">
                    <NavLink to={`/mismatches/${mismatch.id}`} className='mismatch-navlink'>
                        <div className="mismatch-image-container">
                            <img
                                src={
                                    mismatch.user2.userImages[0]
                                        ? mismatch.user2.userImages[0].imageUrl
                                        : "https://picsum.photos/256/256"
                                }
                                className='mismatch-image'
                            ></img>
                        </div>
                        <div className="mismatch-info-container">
                            <div className="mismatch-first-name">
                                {mismatch.user2.firstName}
                            </div>
                            <div className="mismatch-message">
                                {mismatch.messages.length > 0
                                    ? mismatch.messages[
                                          mismatch.messages.length - 1
                                      ].text
                                    : `You've mismatched! Send ${mismatch.user2.firstName} a message!`}
                            </div>
                        </div>
                    </NavLink>
                </div>
            );
        } else {
            return (
                <div className="mismatch-navlink-container">
                    <NavLink to={`/mismatches/${mismatch.id}`}>
                        <div className="mismatch-image-container">
                            <img
                                src={
                                    mismatch.user1.userImages[0]
                                        ? mismatch.user1.userImages[0].imageUrl
                                        : "https://picsum.photos/256/256"
                                }
                            ></img>
                        </div>
                        <div className="mismatch-info-container">
                            <div className="mismatch-first-name">
                                {mismatch.user1.firstName}
                            </div>
                            <div className="mismatch-message">
                                {mismatch.messages.length > 0
                                    ? mismatch.messages[
                                          mismatch.messages.length - 1
                                      ].text
                                    : `You've mismatched! Send ${mismatch.user1.firstName} a message!`}
                            </div>
                        </div>
                    </NavLink>
                </div>
            );
        }
    });

    return (
        <>
        <div className="mismatch-header-container">
            <h1>
            Mismatches
            </h1>
            </div>
        <div className="all-mismatch-container">{mismatch_info}</div>;
        </>
        )
}
