import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import teachers from './reducers/teacher'
import reservations from './reducers/reservation'
import courses from './reducers/course'

const reducer = combineReducers({
  teachers, reservations, courses
})

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)