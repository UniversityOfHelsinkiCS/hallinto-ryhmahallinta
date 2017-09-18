import { baseUrl, withToken } from './index'

export const getAllCourses = () => {
  const url = `${baseUrl}/courses`
  return fetch(withToken(url))
    .then( response => response.json())  
}

export const assignTeacherToGroup = (who, course_id, group_nro) => {
  const url = `${baseUrl}/courses/${course_id}/groups/${group_nro}/teachers`
  const body = {
    who: who,
  }
  return fetch(withToken(url), {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body) 
    })
    .then( response => response.json())  
}

export const unassignTeacherFromGroup = (who, course_id, group_nro) => {
  const url = `${baseUrl}/courses/${course_id}/groups/${group_nro}/teachers/${who}`
  return fetch(withToken(url), {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then( response => response.json())  
}