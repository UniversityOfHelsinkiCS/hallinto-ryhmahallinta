import './App.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Term } from './components/term'
import { getTeachers, getReservations, getAllCourses } from './services'
import { addTeacher, removeTeacher, addCourses } from './reducers/course'
import { addTeachers } from './reducers/teacher'
import { addReservations } from './reducers/reservation'

class App extends Component {
  componentWillMount() {
    getAllCourses()  
    .then( data => {
      //this.context.store.dispatch(addCourses(data))
      this.props.addCourses(data)
    }) 

    getTeachers()  
    .then( data => {
      this.props.addTeachers(data)
    }) 

    getReservations()  
    .then( data => {
      this.props.addReservations(data)
    })       
  }

  getCourses = () => {
    return this.props.courses
  }

  removeTeacher = (who, course_id, group_nro) => {
    return () => {
      this.props.removeTeacher(who, course_id, group_nro)
      //this.context.store.dispatch(removeTeacher(who, course_id, group_nro))
    }
  }

  selectTeacher = (who, course_id, group_nro) => {
    this.props.addTeacher(who, course_id, group_nro)
    //this.context.store.dispatch(addTeacher(who, course_id, group_nro))  
  }

  render() {
    return (
      <Term      
        courses={this.props.courses} 
        year={2017} 
        term={'Syksy'}
        onRemoveTeacher={this.removeTeacher}
        onSelectTeacher={this.selectTeacher}
      />
    )
  }
}

export default connect(
  (state) => ({courses: state.courses}),
  { addTeacher, removeTeacher, addCourses, addTeachers, addReservations }
)(App)
