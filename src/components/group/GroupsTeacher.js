import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { addTeacher, removeTeacher } from '../../reducers/course'
import { withRouter } from 'react-router'

class GroupsTeacher extends Component {
  state = {
    input: ""
  }

  textEntered = (event) => {
    event.preventDefault()
    this.setState({
      input: event.target.value
    })
  }

  onSelectTeacher = (teacher) => {
    const {group, course, addTeacher} = this.props
    return () => {
      this.setState({ input: "" })
      addTeacher(teacher, course.id, group.nro)      
    }
  }

  onRemoveTeacher = (who, course_id, group_nro) => {
    return () => {
      this.setState({ input: "" })
      this.props.removeTeacher(who, course_id, group_nro)
    }
  }

  render() {
    const {group, course} = this.props
    const teachers = this.props.teachers
    const teacher = group.teachers.length>0 ? group.teachers[0] : {}

    const match = (t, input) => {
      return t.nimi.toLowerCase().indexOf(input.toLowerCase())>-1
    }

    const matchingTeachers = () => {
      return teachers.length>0 && this.state.input.length>4 ?
        teachers.filter( t => match(t, this.state.input) ) : []
    }

    if ( group.teachers.length===0 ) {
      return (      
        <div>
          <h2>Teacher of the group</h2>
          <p>Assign teacher by typing the name</p>
          <input value={this.state.input} onChange={this.textEntered}></input>
          <ul>
            {matchingTeachers().map(t => 
              <li key={t.htunnus}>
                {t.nimi}
                <Button color="primary" 
                        onClick={this.onSelectTeacher(t)}>valitse</Button>
              </li>)}
          </ul>
        </div>
      )
    } else  {
      return (
        <div>
          <h2>Teacher of the group</h2>
          <p>
            {teacher.nimi}
            <Button color="warning" 
                    onClick={this.onRemoveTeacher(teacher.htunnus, course.id, group.nro)}>
              poista
            </Button>
          </p>      
        </div>)
    }      
  }
} 


export default withRouter(connect(
  (state) => ({teachers: state.teachers}),
  { addTeacher, removeTeacher }
)(GroupsTeacher))