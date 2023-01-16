import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMismatches } from "../../store/mismatchReducer";

export default function Mismatches() {
    const dispatch = useDispatch();
    const mismatches = Object.values(useSelector((state) => state.mistmatches));
    const user = useSelector((state) => state.session.user);
    console.log("comp mismatch", mismatches);

    const mismatch_info = mismatches.map((mismatch) => {
        if (mismatch.user1Id === user.id) {
            return (
                <NavLink to={`/mismatches/${mismatch.id}`}>
                    <img
                        src={
                            mismatch.user2.userImages[0]
                                ? mismatch.user2.userImages[0].imageUrl
                                : "https://picsum.photos/256/256"
                        }
                    ></img>
                    <div>{mismatch.user2.firstName}</div>
                    <div>{mismatch.user2.age}</div>
                    <div>
                        {mismatch.messages[mismatch.messages.length - 1]
                            ? mismatch.messages[mismatch.messages.length - 1]
                            : `You've mismatched! Send ${mismatch.user2.firstName} a message!`}
                    </div>
                </NavLink>
            );
        } else {
            return (
                <NavLink to={`/mismatches/${mismatch.id}`}>
                    <img
                        src={
                            mismatch.user1.userImages[0]
                                ? mismatch.user1.userImages[0].imageUrl
                                : "https://picsum.photos/256/256"
                        }
                    ></img>
                    <div>{mismatch.user1.firstName}</div>
                    <div>{mismatch.user1.age}</div>
                    <div>
                        {mismatch.messages[mismatch.messages.length - 1]
                            ? mismatch.messages[mismatch.messages.length - 1]
                            : `You've mismatched! Send ${mismatch.user1.firstName} a message!`}
                    </div>
                </NavLink>
            );
        }
    });
    useEffect(() => {
        dispatch(getMismatches(user.id));
    }, []);

    if (!mismatches) return null;

    return <div>{mismatch_info}</div>;
}
