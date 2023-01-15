const LOAD_MISMATCHES = 'reviews/loadMismatches';
const DELETE_MISMATCH = 'reviews/deleteMismatch';

const load = mismatches => ({
    type: LOAD_MISMATCHES, mismatches
});


const remove = (mismatches, mismatchesId) => ({
    type: DELETE_MISMATCH, mismatches, mismatchesId
});

export const getMismatches = (userId) => async dispatch => {
    const res = await fetch(`/api/mismatches/user/${userId}`);
    if (res.ok) {
        const mismatches = await res.json();
        console.log('mismatches', mismatches)
        dispatch(load(mismatches));
    };
};


export const deleteMismatch = (mismatchId) => async dispatch => {
    const res = await fetch(`/api/mismatches/${mismatchId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
        const mismatches = await res.json();
        dispatch(remove(mismatches, mismatchId));
    };
};

let initialState = {};

const mismatchReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_MISMATCHES:
            console.log("action", action)
            const mismatchList = action.mismatches.mismatches
            mismatchList.forEach(mismatch => {
                newState[mismatch.id] = mismatch;
            });
            console.log('newstate', newState)
            return newState;
        case DELETE_MISMATCH:
            newState = { ...state }
            delete newState[action.mismatchesId];
            return newState;
        default:
            return state;
    };
};

export default mismatchReducer;
