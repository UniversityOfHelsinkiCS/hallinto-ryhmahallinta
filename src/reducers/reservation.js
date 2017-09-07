const reservatios = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RESERVATION':
      return {}
    case 'ADD_RESERVATIONS':
      return action.data

    default:
      return state
  }
}

export default reservatios