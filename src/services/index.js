export const baseUrl = 'http://localhost:4567/hallinto'

export { getTeachers } from './teacherService'
export { getReservations, reserveRoomForGroup } from './reservationService'
export { getAllCourses, assignTeacherToGroup, unassignTeacherFromGroup } from './courseService'
