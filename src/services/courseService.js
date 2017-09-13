import {baseUrl} from './index'

export const getAllCourses = () => {
  return fetch(`${baseUrl}/courses`)
    .then( response => response.json())  
}

export const assignTeacherToGroup = (who, course_id, group_nro) => {
  const url = `${baseUrl}/courses/${course_id}/groups/${group_nro}/teachers`
  const body = {
    who: who,
  }
  return fetch(url, {
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
  return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then( response => response.json())  
}