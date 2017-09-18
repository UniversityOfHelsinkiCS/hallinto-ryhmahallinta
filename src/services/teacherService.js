import { baseUrl, withToken } from './index'

export const getTeachers = () => {
  const url = `${baseUrl}/teachers`
  return fetch(withToken(url))
    .then( response => response.json())  
}
