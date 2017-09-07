import React from 'react'
import {Button} from 'reactstrap';
import PropTypes from 'prop-types'
import {availableRooms} from '../../util'

const moment = require('moment')

export class GroupsRoom extends React.Component {
  constructor(props) {
    super(props)
    const initialStart = "2017-09-20"
    const initialEnd = "2017-10-20"
    this.state = {
      startDate: initialStart,
      endDate: initialEnd,
      date: this.dayOfDate(initialStart), 
      difference: this.differenceInWeeks(initialStart, initialEnd),
      roomsAvailable: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe(); 
  }

  differenceInWeeks = (date1, date2) => {
    const start = moment(date1, 'YYYY-MM-DD')
    const end = moment(date2, 'YYYY-MM-DD')
    return end.diff(start, 'weeks') + 1
  }

  dayOfDate = (date) => {
    const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    const dateObject = new Date(date)
    return days[dateObject.getDay()]
  }

  finnishFayOfDate = (date) => {
    const days = ["", "MA", "TI", "KE", "TO", "PE"]
    const dateObject = new Date(date)
    return days[dateObject.getDay()]
  }

  searcForRooms = (e) => {
    e.preventDefault()
    const need = {
      starts: this.starts.value,
      ends: this.ends.value,
      day: this.finnishFayOfDate(this.state.startDate),
      duration: this.differenceInWeeks(this.state.startDate, this.state.endDate),
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

    const reservations = this.context.store.getState().reservations  
    const roomsAvailable = availableRooms(reservations, need)
    this.setState({roomsAvailable})
  }

  reserveRoom = (room) => {
    console.log("reserving", room)
  }

  startChanged = (e) => {
    e.preventDefault()
    const startDate = e.target.value
    this.setState({
      startDate, 
      date: this.dayOfDate(startDate), 
      difference: this.differenceInWeeks(startDate, this.state.endDate)
    })
  }

  endChanged = (e) => {
    e.preventDefault()
    const endDate = e.target.value
    this.setState({
      endDate, difference: this.differenceInWeeks(this.state.startDate, endDate)
    })
  }

  render() {
    const {group} = this.props

    const RoomSelector = () => {
      if ( this.state.roomsAvailable.length===0 ) {
        return (<div></div>)
      }
      return(
        <div>
        <h2>Available rooms</h2>
        <ul>
          {this.state.roomsAvailable.map( room => 
            <li key={room}>
              {room} <Button onClick={this.reserveRoom.bind(null, room)} color="primary">reserve</Button>
            </li>)}
        </ul>
      </div>        
      )
    }

    if (group.sali_nro===null) {
      return (
      <div>
        <h2>reserve a room</h2>

        <form>
          <div>
            start date 
            <input type="date" 
                  value={this.state.startDate} 
                  onChange={this.startChanged}/>
            {this.state.date}
          </div>
          <div>
            end date 
            <input type="date" 
                  value={this.state.endDate} 
                  onChange={this.endChanged}/> 
            {this.state.difference} weeks      
          </div>
          <div>
            from <input type="number" ref={(input) => { this.starts = input; }} defaultValue="12"/> 
            to <input type="number" ref={(input) => { this.ends = input; }}  defaultValue="14"/> 
          </div>
          <div>
            <Button onClick={this.searcForRooms} color="primary">search for rooms</Button>
          </div>
        </form>

        {RoomSelector()}

      </div>)
    }
    
    return (<div>
      room: {group.sali_nro}
    </div>)

  }
}

GroupsRoom.contextTypes = {
  store: PropTypes.object
} 