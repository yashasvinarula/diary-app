import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import postreducer from '../reducers';

const reducer = combineReducers ({ 
    posts: postreducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store
