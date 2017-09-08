import { getTeachers } from '../services'

const ADD_TEACHERS = 'ADD_TEACHERS'

const teachers = (state = [], action) => {
  switch (action.type) {
    case ADD_TEACHERS:
      return state.concat(action.data) 
    default:
      return state
  }
}

const addTeachers = (data) => {
  return {
    type: ADD_TEACHERS, 
    data: data
  }
}

export const fetchTeachers = () => {
  return (dispatch) => {
    getTeachers().then(teachers => dispatch(addTeachers(teachers)))
  }
}

export default teachers