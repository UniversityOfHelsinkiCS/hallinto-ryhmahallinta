import { getAllCourses } from '../services'

const ADD_TEACHER = 'ADD_TEACHER'
const REMOVE_TEACHER = 'REMOVE_TEACHER'
const ADD_COURSES = 'ADD_COURSES'

const courses = (state = [], action) => {
  switch (action.type) {
    case ADD_COURSES:
      return state.concat(action.data) 
    case REMOVE_TEACHER: {
      const {who, course_id, group_nro} = action.data
      const courses = state.filter(c => c.id!==course_id)
    
      let modifiedCourse = state.find(c => c.id===course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)
      group.teachers = group.teachers.filter( t => t.htunnus!==who )
      
      return courses.concat(modifiedCourse) 
    }
    case ADD_TEACHER: {
      const {who, course_id, group_nro} = action.data
      who.opetustehtava = 'LH'
      const courses = state.filter(c => c.id!==course_id)
      
      let modifiedCourse = state.find(c => c.id===course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)
      group.teachers.push(who)

      return courses.concat(modifiedCourse)   
    }
    default:
      return state
  }
}

export const addTeacher = (who, course_id, group_nro) => {
  return {
    type: "ADD_TEACHER",
    data: {
      who, course_id, group_nro
    }
  }
}

export const removeTeacher = (who, course_id, group_nro) => {
  return {
    type: REMOVE_TEACHER,
    data: {
      who, course_id, group_nro
    }
  }
}

const addCourses = (data) => {
  return {
    type: ADD_COURSES, 
    data: data
  }
}

export const fetchCourses = () => {
  return (dispatch) => {
    getAllCourses().then(courses => dispatch(addCourses(courses)))
  }
}

export default courses