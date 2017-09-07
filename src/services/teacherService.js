import {baseUrl} from './index'

export const getTeachers = () => {
  return fetch(`${baseUrl}/teachers`)
    .then( response => response.json())  
}
