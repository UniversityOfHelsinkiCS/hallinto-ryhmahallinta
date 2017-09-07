import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'

export class GroupsTeacher extends Component {
  constructor() {
    super()
    this.state = {
      input: ""
    }
    this.textEntered = this.textEntered.bind(this)
    this.selectTeacher = this.selectTeacher.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe(); 
  }

  textEntered(event) {
    event.preventDefault()
    this.setState({
      input: event.target.value
    })
  }

  selectTeacher(teacher) {
    const {group, course, onSelectTeacher} = this.props
    return () => {
      this.setState({
        input: ""
      })
      onSelectTeacher(teacher, course.id, group.nro)      
    }
  }

  render() {
    const {group, course, onRemoveTeacher} = this.props
    const teachers = this.context.store.getState().teachers
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
                <Button color="primary" onClick={this.selectTeacher(t)}>valitse</Button>
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
                    onClick={onRemoveTeacher(teacher.htunnus, course.id, group.nro)}
            >
              poista
            </Button>
          </p>      
        </div>)
    }      
  }
} 

GroupsTeacher.contextTypes = {
  store: PropTypes.object
} 