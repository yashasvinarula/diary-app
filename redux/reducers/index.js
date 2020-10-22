import * as types from '../actions/actionTypes'
const posts = require('../../utils/posts');
const initialState = {
    posts: posts,
}

const dummyReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case types.CREATE_POST: 
            return {...state, posts: [action.payload, ...state.posts]}
        case types.FETCH_POSTS:
            return {...state, posts: state.posts.reverse()}
        case types.DELETE_POSTS: 
            let temp = [...state.posts.filter(p => p.id != action.payload.id)];
            return {...state, posts: temp}
        case types.EDIT_POST: {
            let temp = []
            for(let i=0;i<state.posts.length;i++){
                console.log('id frmo here',state.posts[i].id, action.payload.id);
                if(state.posts[i].id == action.payload.id){
                    temp.push(action.payload.data)
                }else{
                    temp.push(state.posts[i])
                }
            }
            console.log(temp);
            return {...state, posts: temp}
        }
        default:
            return state;
    }

}

export default dummyReducer