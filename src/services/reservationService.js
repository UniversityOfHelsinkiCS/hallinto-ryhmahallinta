import {baseUrl} from './index'

export const getReservations = () => {
  return fetch(`${baseUrl}/reservations`)
    .then( response => response.json())  
}