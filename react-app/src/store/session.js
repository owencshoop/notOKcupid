// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const DISCOVER_USERS = 'session/DISCOVER_USERS'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const loadDiscoverUsers = (discoverUser) => ({
  type: DISCOVER_USERS,
  payload: discoverUser
})

const initialState = { user: null, discoverUsers: null };

export const discoverUserLoad = () => async (dispatch) => {
  const response = await fetch('/api/users/discover')

  if (response.ok) {
    const data = await response.json()
    if (data.errors) {
      return;
    }
    dispatch(loadDiscoverUsers(data))
  }
}

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const updatePreferences = (preferredGenders, minAge, maxAge) => async (dispatch) => {
  const response = await fetch('/api/auth/preferences', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      preferredGenders,
      minAge,
      maxAge
    })
  })

  if (response.ok){
    const data = await response.json()
    dispatch(setUser(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, firstName, age, gender, preferredGenders, minAge, maxAge, city, state, bio, imageUrl) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      age,
      gender,
      preferredGenders,
      minAge,
      maxAge,
      city,
      state,
      bio,
      imageUrl
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateUser = (firstName, age, gender, preferredGenders, minAge, maxAge, city, state, bio, imageUrl) => async (dispatch) => {
  const response = await fetch('/api/users/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      age,
      gender,
      preferredGenders,
      minAge,
      maxAge,
      city,
      state,
      bio,
      imageUrl
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateAnswer = (userAnswerId, answer, userId) => async (dispatch) => {
  const response = await fetch(`/api/questions/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userAnswerId,
      answer
    }),
  });
  if (response.ok){
    const data = await response.json()
    dispatch(setUser(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const addDislike = (disliked_id) => async (dispatch) => {
  const response = await fetch(`/api/users/dislikes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      disliked_id
    })
  })
  if (response.ok){
    const data = await response.json()
    dispatch(setUser(data))
    return data
  } else if (response.status < 500) {
    const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ['An error occurred. Please try again.']
    return data
  }
}

export const deleteDislike = (disliked_id) => async (dispatch) => {
  const response = await fetch(`/api/users/dislikes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      disliked_id
    })
  })
  if (response.ok){
    const data = await response.json()
    dispatch(setUser(data))
    return data
  } else if (response.status < 500) {
    const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
    // return ['An error occurred. Please try again.']
    return data
  }
}

export const addLike = (liked_id) => async (dispatch) => {
  const response = await fetch(`/api/users/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      liked_id
    })
  })
  if (response.ok){
    const data = await response.json()
    dispatch(setUser(data))
    return data
  } else if (response.status < 500) {
    const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ['An error occurred. Please try again.']
  return data
  }
}

export const deleteLike = (liked_id) => async (dispatch) => {
  const response = await fetch(`/api/users/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      liked_id
    })
  })
  if (response.ok){
    const data = await response.json()
    dispatch(setUser(data))
    return data
  } else if (response.status < 500) {
    const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ['An error occurred. Please try again.']
  return data
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case REMOVE_USER:
      return initialState
    case DISCOVER_USERS:
      return { ...state, discoverUsers: {...action.payload.discoverUsers} }
    default:
      return state;
  }
}
