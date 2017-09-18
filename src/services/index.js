//export const baseUrl = 'http://localhost:4567/hallinto'
export const baseUrl = 'https://opetushallinto.cs.helsinki.fi/hallinto'
const token = '43929388045365819013'

export const withToken = (url) => `${url}?authorization=${token}`

export { getTeachers } from './teacherService'
export { getReservations, reserveRoomForGroup } from './reservationService'
export { getAllCourses, assignTeacherToGroup, unassignTeacherFromGroup } from './courseService'
