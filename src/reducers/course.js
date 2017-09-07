const courses = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COURSE':
      return state.concat(action.data) 
    case 'ADD_COURSES':
      return state.concat(action.data) 
    case 'REMOVE_TEACHER': {
      const {who, course_id, group_nro} = action.data
      const courses = state.filter(c => c.id!==course_id)
    
      let modifiedCourse = state.find(c => c.id===course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)
      group.teachers = []

      return courses.concat(modifiedCourse) 
    }
    case 'ADD_TEACHER': {
      const {who, course_id, group_nro} = action.data
      who.opetustehtava = 'LH'
      const courses = state.filter(c => c.id!==course_id)
      
      let modifiedCourse = state.find(c => c.id===course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)
      group.teachers = [who]

      return courses.concat(modifiedCourse)   
    }
    default:
      return state
  }
}

export default courses

/*

*/
  