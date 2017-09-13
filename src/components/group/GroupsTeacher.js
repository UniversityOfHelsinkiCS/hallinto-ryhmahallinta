import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { addTeacherToGroup, removeTeacherFromGroup } from '../../reducers/course'
import { withRouter } from 'react-router'
import { RadioGroup, Radio } from 'react-radio-group'
import { differenceInWeeks } from '../../util'

class GroupsTeacher extends Component {
  totalHoursOf(group) {
    if (group.paattymis_pvm===null || group.alkamis_pvm===null) {
      return 0
    }
    const weeks = differenceInWeeks(group.paattymis_pvm, group.alkamis_pvm)  
    const hours = group.loppuu - group.alkaa
    return weeks*hours
  }

  constructor(props){
    super(props)

    this.state = {
      input: "",
      selected: null,
      payment: 'T',
      hours: this.totalHoursOf(props.group)
    }
  }
  
  componentWillReceiveProps(nextProps) {    
    this.setState({
      hours: this.totalHoursOf(nextProps.group)
    })
  }

  textEntered = (event) => {
    event.preventDefault()
    this.setState({
      input: event.target.value
    })
  }

  onSelectTeacher = (teacher) => {
    return () => {
      this.setState({ 
        input: "" , 
        selected: teacher
      })   
    }
  }

  onSaveTeacher = (teacher) => {
    const {group, course} = this.props

    return () => {
      teacher.hours = this.state.hours
      teacher.payment = this.state.payment
      this.setState({ input: "", selected: null })
      this.props.addTeacherToGroup(teacher, course.id, group.nro)      
    }
  }

  onCancel = () => {
    this.setState({ input: "", selected: null })    
  }

  onRemoveTeacher = (who, course_id, group_nro) => {
    return () => {
      if (window.confirm('Are you sure you want to remove the teacher from group')) {
        this.setState({ input: "" })
        this.props.removeTeacherFromGroup(who, course_id, group_nro)
      } 
    }
  }

  handleSelection = (value) => {
    this.setState({ payment: value})
  }

  hoursChanged = (e) => {
    e.preventDefault()
    this.setState({hours: Number(e.target.value)})
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

    const form = () => {
      const selected = this.state.selected
      if (selected==null) {
        return null
      }
      return (
        <div>
          <div className='hpadded10'>{selected.nimi}</div>
          <div className='hpadded10'>
            <RadioGroup name='payment' 
                selectedValue={this.state.payment} 
                onChange={this.handleSelection}>
              <span className='field--button'>
                <Radio value='T' />tuntiopettaja
              </span>
              <span className='field--button'>
                <Radio value='V' />virassa
              </span>
            </RadioGroup>
          </div>
          <div className='hpadded10'>
            <span className='field__label100'>tunteja:</span> 
            <input className='field__label100' value={this.state.hours} onChange={this.hoursChanged}/>
          </div>
          <div className='hpadded10'>
            <Button color='primary'
                    onClick={this.onSaveTeacher(selected)}>save</Button> 
            <Button color='alert' 
                    onClick={this.onCancel}>cancel</Button>     
          </div>                     
        </div>
      )      
    }

    const selector = () => {
      const selected = this.state.selected
      if (selected!=null) {
        return null
      }
            
      return (
        <div>
          <p>Select teacher by typing the name</p>
          <input value={this.state.input} onChange={this.textEntered}></input>
          <ul>
            {matchingTeachers().map(t => 
              <li key={t.htunnus} className='hpadded'>
                <span className='padded'>
                  {t.nimi}
                </span>
                <Button color="primary" className='button__padded'
                        onClick={this.onSelectTeacher(t)}>select</Button>
              </li>)}
          </ul> 
        </div>
      )     
    }

    if ( group.teachers.length===0 ) {
      return (    
        <div className='hpadded20'>
          <h2>Teacher of the group</h2>
          {selector()}
          {form()}
        </div>
      )
    } else  {
      return (
        <div className='hpadded20'>
          <h2>Teacher of the group</h2>
          <p>
            <span className='padded'>
              {teacher.nimi}
            </span>
            <Button color="warning" 
                    onClick={this.onRemoveTeacher(teacher.htunnus, course.id, group.nro)}>
              remove
            </Button>
          </p>      
        </div>)
    }      
  }
} 

export default withRouter(connect(
  (state) => ({teachers: state.teachers}),
  { addTeacherToGroup, removeTeacherFromGroup }
)(GroupsTeacher))