const ADD_TEACHERS = 'ADD_TEACHERS'

const teachers = (state = [], action) => {
  switch (action.type) {
    case ADD_TEACHERS:
      return state.concat(action.data) 
    default:
      return state
  }
}

export const addTeachers = (data) => {
  return {
    type: ADD_TEACHERS, 
    data: data
  }
}

export const fetchTeachers = () => {
  console.log("fetch")
  return (dispatch) => {
    console.log("metodi")
  }
}

export default teachers