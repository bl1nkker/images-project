import { combineReducers } from 'redux'
import authReducer from './authReducer'
import imageReducer from './imageReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    user:authReducer,
    images:imageReducer,
    app: appReducer
})

export default rootReducer