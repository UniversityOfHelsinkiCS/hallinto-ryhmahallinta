import {baseUrl} from './index'

export const getReservations = () => {
  return fetch(`${baseUrl}/reservations`)
    .then( response => response.json())  
}

export const reserveRoomForGroup = (data) => {
  const url = `${baseUrl}/reservations`
  return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({data}) 
    })
    .then( response => response.json()) 
} 