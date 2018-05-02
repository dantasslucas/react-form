import { combineReducers } from 'redux'
import todoRedurces from '../todo/todoReducers'
const rootReducers = combineReducers({
    todo: todoRedurces
})

export default rootReducers