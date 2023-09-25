import * as UserApi from '../api/UserRequest'

// Action creator function for updating a user's profile data
export const updateUser = (id, formData) => async (dispatch) => {
    // Dispatch an action to indicate that the updating process has started
    dispatch({ type: "UPDATING_START" })

    try {
        // Attempt to send a request to the UserApi to update the user's data
        const { data } = await UserApi.updateUser(id, formData);

        // Dispatch a success action with the updated data if the request is successful
        dispatch({ type: "UPDATING_SUCCESS", data: data })

    } catch (error) {
        // Dispatch a fail action if there is an error during the update process
        dispatch({ type: "UPDATING_FAIL" })
    }
}

export const followUser = (id, data) => async (dispatch) => {
    dispatch({type: "FOLLOW_USER"});
    UserApi.followUser(id, data)
}
 
export const unFollowUser = (id, data) => async (dispatch) => {
    dispatch({type: "UNFOLLOW_USER"});
    UserApi.unFollowUser(id, data)
}