import { getReservations } from '../services'

const ADD_RESERVATIONS = 'ADD_RESERVATIONS'

const reservatios = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RESERVATION':
      return {}
    case ADD_RESERVATIONS:
      return action.data

    default:
      return state
  }
}

const addReservations = (data) => {
  return {
    type: ADD_RESERVATIONS, 
    data: data
  }
}

export const fetchReservations = () => {
  return (dispatch) => {
    getReservations().then(teachers => dispatch(addReservations(teachers)))
  }
}

export default reservatios