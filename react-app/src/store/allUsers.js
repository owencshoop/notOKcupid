const LOAD_ALL_USERS = 'allUsers/LOAD_ALL_USERS'

const loadAllUsers = (users) => ({
    type: LOAD_ALL_USERS,
    users
})

export const loadUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/')
    if (response.ok) {
        const users = await response.json()
        dispatch(loadAllUsers(users))
    }
}

let initialState = {}

const allUsersReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case LOAD_ALL_USERS:
            newState = {...action.users}
            return newState
        default:
            return state
    }
}

export default allUsersReducer
