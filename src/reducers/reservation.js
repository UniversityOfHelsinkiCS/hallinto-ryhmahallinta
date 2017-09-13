import { getReservations } from '../services'

const ADD_RESERVATIONS = 'ADD_RESERVATIONS'
export const ADD_RESERVATION_FOR_GROUP = 'ADD_RESERVATION_FOR_GROUP'

const reservatios = (state = {}, action) => {
  switch (action.type) {
    case ADD_RESERVATION_FOR_GROUP:
      // TODO
      return state
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

export const addReservationForGroup = (data) => {
  return {
    type: ADD_RESERVATION_FOR_GROUP, 
    data: data
  }
}

export const fetchReservations = () => {
  return (dispatch) => {
    getReservations().then(teachers => dispatch(addReservations(teachers)))
  }
}

export default reservatios