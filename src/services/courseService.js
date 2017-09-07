import {baseUrl} from './index'

export const getAllCourses = () => {
  return fetch(`${baseUrl}/courses`)
    .then( response => response.json())  
}