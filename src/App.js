import './App.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Term } from './components/term'
import { getTeachers, getReservations, getAllCourses } from './services'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }

  componentWillMount() {

    getAllCourses()  
    .then( data => {
      this.setState({ 
        courses: data
      })
    })

    getAllCourses()  
    .then( data => {
      this.context.store.dispatch({
        type: 'ADD_COURSES', 
        data: data
      })
    }) 

    getTeachers()  
    .then( data => {
      this.context.store.dispatch({
        type: 'ADD_TEACHERS', 
        data: data
      })
    }) 

    getReservations()  
    .then( data => {
      this.context.store.dispatch({
        type: 'ADD_RESERVATIONS', 
        data: data
      })
    })       
  }

  removeTeacher = (who, course_id, group_nro) => {
    return () => {
      console.log(who, course_id, group_nro)
      const courses = this.state.courses.filter(c => c.id!==course_id)

      let modifiedCourse = this.state.courses.find(c => c.id===course_id)
      let group = modifiedCourse.groups.find(g => g.nro===group_nro)
      group.teachers = []

      const action = {
        type: "REMOVE_TEACHER",
        data: {
          who, course_id, group_nro
        }
      }

      this.context.store.dispatch(action)

      //this.setState({ 
      //  courses: courses.concat(modifiedCourse)
      //}) 
    }
  }

  selectTeacher = (who, course_id, group_nro) => {
    who.opetustehtava = 'LH'
    const courses = this.state.courses.filter(c => c.id!==course_id)
    
    let modifiedCourse = this.state.courses.find(c => c.id===course_id)
    let group = modifiedCourse.groups.find(g => g.nro===group_nro)
    group.teachers = [who]
   
    const action = {
      type: "ADD_TEACHER",
      data: {
        who, course_id, group_nro
      }
    }

    this.context.store.dispatch(action)    

    //this.setState({ 
    //  courses: courses.concat(modifiedCourse)
    //})     
  }

  render() {
    return (
      <Term 
        courses={this.state.courses} 
        year={2017} 
        term={'Syksy'}
        onRemoveTeacher={this.removeTeacher}
        onSelectTeacher={this.selectTeacher}
      />
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App