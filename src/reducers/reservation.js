import { getReservations, reserveRoomForGroup } from '../services'

const ADD_RESERVATIONS = 'ADD_RESERVATIONS'
export const ADD_RESERVATION_FOR_GROUP = 'ADD_RESERVATION_FOR_GROUP'

const reservatios = (state = {}, action) => {
  switch (action.type) {
    case ADD_RESERVATION_FOR_GROUP:
      const data = action.data
      // make a deep copy
      const room = state[data.sali_nro] 
      const pva = data.pva

      if ( room[pva] === undefined ) {
        room[pva] = []
      }

      const reservation = {
        sali_nro: data.sali_nro,
        kurssikoodi: data.course_id.split('-')[0],
        viikonpaiva: pva,
        alkamisaika: data.alkaa,
        paattymisika: data.loppuu,
        alkamis_pvm: data.alkamis_pvm,
        paattymis_pvm: data.paattymis_pvm
      }

      room[pva].push(reservation) 

      // deepcopy     
      state[data.sali_nro] = room
      
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

const addReservation = (data) => {
  return {
    type: ADD_RESERVATION_FOR_GROUP, 
    data: data
  }
}

export const addReservationForGroup = (data) => {
  return (dispatch) => {
    
    reserveRoomForGroup(data)
      .then(teachers => dispatch(addReservation(data)))
  }
}

export const fetchReservations = () => {
  return (dispatch) => {
    getReservations().then(teachers => dispatch(addReservations(teachers)))
  }
}

export default reservatios