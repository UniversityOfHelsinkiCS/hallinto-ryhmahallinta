import './App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import  Term from './components/term/Term'
import { getTeachers, getReservations, getAllCourses } from './services'
import { addCourses } from './reducers/course'
import { addTeachers } from './reducers/teacher'
import { addReservations } from './reducers/reservation'

class App extends Component {
  componentWillMount() {
    getAllCourses()  
    .then( data => {
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

  render() {
    return (
      <Term year={2017} term={'Syksy'}/>
    )
  }
}

export default withRouter(connect(
  (state) => ({courses: state.courses}),
  { addCourses, addTeachers, addReservations }
)(App))
