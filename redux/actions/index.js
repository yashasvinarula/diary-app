import posts from '../../utils/posts';
import * as types from './actionTypes';

export const createPost = (payload) => async dispatch => {
    dispatch({
        type: types.CREATE_POST,
        payload: payload
    });
    return Promise.resolve();
}

export const fetchPosts = () => dispatch => {
    dispatch({
        type: types.FETCH_POSTS
    });
    return Promise.resolve();
}

export const deletePost = (id) => dispatch => {
    dispatch({
        type: types.DELETE_POSTS,
        payload: {
            id: id
        }
    });
    return Promise.resolve();
}

export const editPost = (post) => dispatch => {
    dispatch({
        type: types.EDIT_POST,
        payload: {
            id: post.id,
            data: post
        }
    });
    return Promise.resolve();
}

// module.exports = {
//     createPost,
//     fetchPosts,
//     editPost,
//     deletePost
// }