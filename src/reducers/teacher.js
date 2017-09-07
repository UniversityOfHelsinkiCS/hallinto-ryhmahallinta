const teachers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TEACHER':
      return state.concat(action.data) 
    case 'ADD_TEACHERS':
      return state.concat(action.data) 
    default:
      return state
  }
}

export default teachers