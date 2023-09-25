// Define the initial state for the authReducer
const authReducer = (
    state = { authData: null, loading: false, error: false, updateLoading: true },
    action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false }

        case "AUTH_SUCCESS":
            // Store the user's authentication data in local storage for persistence
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }))
            // Update the state with the authenticated user data
            return { ...state, authData: action.data, loading: false, error: false }

        case "AUTH_FAIL":
            return { ...state, loading: false, error: true }

        case "UPDATING_START":
            return { ...state, updateLoading: true, error: false }

        case "UPDATING_SUCCESS":
            // Store the updated user profile data in local storage for persistence
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            // Update the state with the updated user data
            return { ...state, authData: action.data, updateLoading: false, error: false }

        case "UPDATING_FAIL":
            return { ...state, updateLoading: false, error: true }
            
        case "FOLLOW_USER":
            return { ...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]}}}

        case "UNFOLLOW_USER":
            return { ...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId!==action.data)]}}}

        case "LOG_OUT":
            // Clear the local storage to remove the user's authentication data
            localStorage.clear();
            // Reset the state to represent a logged-out user
            return { ...state, authData: null, loading: false, error: true }

        default:
            return state;
    }
}

export default authReducer;