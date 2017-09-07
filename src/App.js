import './App.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Term } from './components/term'
import { getTeachers, getReservations, getAllCourses } from './services'
import { addTeacher, removeTeacher, addCourses } from './reducers/course'
import { addTeachers } from './reducers/teacher'
import { addReservations } from './reducers/reservation'

class App extends Component {
  componentWillMount() {
    getAllCourses()  
    .then( data => {
      this.context.store.dispatch(addCourses(data))
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

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe(); 
  }

  getCourses = () => {
    return this.context.store.getState().courses
  }

  removeTeacher = (who, course_id, group_nro) => {
    return () => {
      this.context.store.dispatch(removeTeacher(who, course_id, group_nro))
    }
  }

  selectTeacher = (who, course_id, group_nro) => {
    this.context.store.dispatch(addTeacher(who, course_id, group_nro))  
  }

  render() {
    const courses = this.getCourses()
    return (
      <Term      
        courses={courses} 
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