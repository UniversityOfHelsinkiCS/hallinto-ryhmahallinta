import { baseUrl, withToken } from './index'

export const getReservations = () => {
  const url = `${baseUrl}/reservations`
  return fetch(withToken(url))
    .then( response => response.json())  
}

export const reserveRoomForGroup = (data) => {
  const url = `${baseUrl}/reservations`
  return fetch(withToken(url), {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({data}) 
    })
    .then( response => response.json()) 
} 