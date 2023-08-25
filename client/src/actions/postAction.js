import * as PostApi from '../api/PostRequest.js'

export const getTimeLinePosts = (id) => async (dispatch) => {
    // Dispatch an action to indicate fetching is starting
    dispatch({ type: 'RETREIVING_START' })
    try {
        // Fetch timeline posts using the API function and the provided user ID
        const { data } = await PostApi.getTimeLinePosts(id);
        // Dispatch a success action with the fetched data
        dispatch({ type: 'RETREIVING_SUCCESS', data: data })
    } catch (error) {
        // Dispatch a fail action if an error occurs and log the error
        dispatch({ type: 'RETREIVING_FAIL' })
        console.log(error)
    }

}