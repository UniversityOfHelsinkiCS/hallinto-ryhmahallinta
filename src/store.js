import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';

import teachers from './reducers/teacher';
import reservations from './reducers/reservation';
import courses from './reducers/course';

const reduser = combineReducers({
  teachers, reservations, courses
})

export default createStore(reduser, devToolsEnhancer())