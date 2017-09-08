import './App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import  Term from './components/term/Term'
import { fetchCourses } from './reducers/course'
import { fetchTeachers } from './reducers/teacher'
import { fetchReservations } from './reducers/reservation'

class App extends Component {
  componentWillMount() {
    this.props.fetchTeachers()
    this.props.fetchCourses()
    this.props.fetchReservations()     
  }

  render() {
    return (
      <Term year={2017} term={'Syksy'}/>
    )
  }
}

export default withRouter(connect(
  (state) => ({courses: state.courses}),
  { fetchReservations, fetchCourses, fetchTeachers }
)(App))