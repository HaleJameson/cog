import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';
import * as api from '../api/postsApi';

// Action Creators
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data})
    } catch (err) {
        console.log(err.message);
    }

    // const action = { type: 'FETCH_ALL', payload: []}
    // dispatch(action);
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch({type: CREATE, payload: data});
    } catch (err) {
        console.log(err.message);
    }
}



//api.fetchPosts()