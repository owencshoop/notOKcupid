import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMismatches } from '../store/mismatchReducer';

export default function Mismatches() {
    const dispatch = useDispatch();
    const mismatches = Object.values(useSelector(state => state.mismatchReducer));
    console.log('comp mismatch', mismatches)

    useEffect(() => {
        dispatch(getMismatches(20));
    }, []);

    if (!mismatches) return null;

    return (
        <div>
            {mismatches}
        </div>
    );
};
