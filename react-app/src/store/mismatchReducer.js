const LOAD_MISMATCHES = "reviews/loadMismatches";
const LOAD_SINGLE_MISMATCH = "reviews/loadSingleMismatch";
const DELETE_MISMATCH = "reviews/deleteMismatch";

const load = (mismatches) => ({
    type: LOAD_MISMATCHES,
    mismatches,
});

const loadSingleMistmatch = (mismatch) => ({
    type: LOAD_SINGLE_MISMATCH,
    payload: mismatch,
});

const remove = (mismatches, mismatchesId) => ({
    type: DELETE_MISMATCH,
    mismatches,
    mismatchesId,
});

export const getMismatches = (userId) => async (dispatch) => {
    const res = await fetch(`/api/mismatches/user/${userId}`);
    if (res.ok) {
        const mismatches = await res.json();
        console.log("mismatches", mismatches);
        dispatch(load(mismatches));
    }
};

export const deleteMismatch = (mismatchId) => async (dispatch) => {
    const res = await fetch(`/api/mismatches/${mismatchId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
        const mismatches = await res.json();
        dispatch(remove(mismatches, mismatchId));
    }
};

export const sendMessage = (mismatchId, text) => async (dispatch) => {
    const response = await fetch(`/api/messages/${mismatchId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSingleMistmatch(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

let initialState = {};

const mismatchReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_MISMATCHES:
            const mismatchList = action.mismatches.mismatches;
            mismatchList.forEach((mismatch) => {
                newState[mismatch.id] = mismatch;
            });
            return newState;
        case LOAD_SINGLE_MISMATCH:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_MISMATCH:
            newState = { ...state };
            delete newState[action.mismatchesId];
            return newState;
        default:
            return state;
    }
};

export default mismatchReducer;
