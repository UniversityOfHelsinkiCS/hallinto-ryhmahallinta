import { getAllCourses, assignTeacherToGroup, unassignTeacherFromGroup } from '../services'
import { ADD_RESERVATION_FOR_GROUP } from './reservation'

const ADD_TEACHER = 'ADD_TEACHER'
const REMOVE_TEACHER = 'REMOVE_TEACHER'
const ADD_COURSES = 'ADD_COURSES'

const coursesExcept = (state, course_id) => state.filter(c => c.id!==course_id)
const courseWith = (state, course_id) => state.find(c => c.id===course_id)

const courses = (state = [], action) => {
  switch (action.type) {
    case ADD_COURSES:
      return state.concat(action.data) 
    case REMOVE_TEACHER: {
      const {who, course_id, group_nro} = action.data

      let modifiedCourse = courseWith(state, course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)
      group.teachers = group.teachers.filter( t => t.htunnus!==who )

      return coursesExcept(state, course_id).concat(modifiedCourse)   
    }
    case ADD_TEACHER: {
      const {who, course_id, group_nro} = action.data
      who.opetustehtava = 'LH'
      
      let modifiedCourse = courseWith(state, course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)
      group.teachers.push(who)

      return coursesExcept(state, course_id).concat(modifiedCourse)   
    }
    case ADD_RESERVATION_FOR_GROUP:
      const {room, course_id, group_nro} = action.data

      let modifiedCourse = courseWith(state, course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)

      group.alkaa = action.data.alkaa
      group.loppuu = action.data.loppuu
      group.pva = action.data.pva
      group.alkamis_pvm = action.data.alkamis_pvm
      group.paattymis_pvm = action.data.paattymis_pvm
      group.sali_nro = action.data.sali_nro

      return coursesExcept(state, course_id).concat(modifiedCourse)   
    default:
      return state
  }
}

const addTeacherToGroupAction = (who, course_id, group_nro) => {
  return {
    type: "ADD_TEACHER",
    data: {
      who, course_id, group_nro
    }
  }
}

export const addTeacherToGroup = (who, course_id, group_nro) => {
  return (dispatch) => {
    assignTeacherToGroup(who, course_id, group_nro)
    .then(response => {
      console.log('add', response)
      dispatch(addTeacherToGroupAction(who, course_id, group_nro))
    })
  }  
}

const removeTeacherFromGroupAction = (who, course_id, group_nro) => {
  return {
    type: REMOVE_TEACHER,
    data: {
      who, course_id, group_nro
    }
  }
}

export const removeTeacherFromGroup = (who, course_id, group_nro) => {
  return (dispatch) => {
    unassignTeacherFromGroup(who, course_id, group_nro)
    .then(response => {
      console.log('remove', response)
      dispatch(removeTeacherFromGroupAction(who, course_id, group_nro))
    })
  }  
}

//

const addCourses = (data) => {
  return {
    type: ADD_COURSES, 
    data: data
  }
}

export const fetchCourses = () => {
  return (dispatch) => {
    const comparer = function(a,b) {
      const x = a.nimi.toLowerCase();
      const y = b.nimi.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }

    getAllCourses().then(courses => dispatch(addCourses(courses.sort(comparer)))
    )
  }
}

export default courses