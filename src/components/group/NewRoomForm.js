import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { availableRooms, finnishDayOfDate, dayOfDate, differenceInWeeks, dateAfterWeeks } from '../../util'
import { addReservationForGroup } from '../../reducers/reservation'

const RoomSelector = ({roomsAvailable, reserveRoom}) => {
  if ( roomsAvailable.length===0 ) {
    return (<div></div>)
  }

  return(
    <div>
    <h2>Available rooms</h2>
    <ul>
      {roomsAvailable.map( room => 
        <li key={room}>
          <span className='field__label100'>{room}</span>
          <Button className='field__label100' onClick={reserveRoom(room)} 
                  color="primary">reserve</Button>
        </li>)}
    </ul>
  </div>        
  )  
}

class NewRoomForm extends React.Component {
  constructor(props) {
    super(props)

    const initialStart = (props.group.alkamis_pvm || props.course.alkamis_pvm).substring(0, 10)
    const intitialDifference = 7

    const starts = props.group.alkaa || 10
    const ends = props.group.loppuu || 12 

    this.state = {
      startDate: initialStart,
      endDate: dateAfterWeeks(initialStart, intitialDifference),
      date: dayOfDate(initialStart), 
      difference: intitialDifference,
      roomsAvailable: [],
      starts, ends,
      formVisible: false,
      searchEnabled: true
    }
  }

  cancelSearchForRooms = (e) => {
    this.setState({
      searchEnabled: true,
      roomsAvailable: []
    })
  }

  searchForRooms = (e) => {
    e.preventDefault()
    const need = {
      starts: this.state.starts,
      ends: this.state.ends,
      day: finnishDayOfDate(this.state.startDate),
      duration: differenceInWeeks(this.state.endDate, this.state.startDate),
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

    const reservations = this.props.reservations  
    const roomsAvailable = availableRooms(reservations, need)
    this.setState({
      roomsAvailable,
      searchEnabled: false
    })
  }

  reserveRoom = (room) => {
    const toDate = (date) => {
      const [y, m, d] = date.split('-')
      return `${d}.${m}.${y}`
    }

    return () => {
      const data = {
        sali_nro: room, 
        course_id: this.props.course.id, 
        group_nro: this.props.group.nro,
        alkaa: this.state.starts,
        loppuu: this.state.ends,
        pva: finnishDayOfDate(this.state.startDate),
        alkamis_pvm: this.state.startDate,
        paattymis_pvm: this.state.endDate   
      }

      if (window.confirm(`Reserve room ${data.sali_nro} ${data.pva} ${data.alkaa}-${data.loppuu} from ${toDate(data.alkamis_pvm)} to ${toDate(data.paattymis_pvm)}`)) {
        this.props.addReservationForGroup(data)
        this.setState({
          searchEnabled: true,
          formVisible: false,
          roomsAvailable: []
        })        
      } 
    }
  }

  startChanged = (e) => {
    e.preventDefault()

    const startDate = e.target.value
    this.setState({
      startDate, 
      date: dayOfDate(startDate), 
      difference: differenceInWeeks(this.state.endDate, startDate)
    })
  }

  endChanged = (e) => {
    e.preventDefault()

    const endDate = e.target.value
    this.setState({
      endDate, difference: differenceInWeeks(endDate, this.state.startDate)
    })
  }

  weeksChanged = (e) => {
    e.preventDefault()
    const difference = e.target.value
    this.setState({
        endDate: dateAfterWeeks(this.state.startDate, difference),
        difference      
    })  
  }

  startTimeChanges = (e) => {
    e.preventDefault()
    this.setState({starts: Number(e.target.value)})
  }

  endTimeChanges = (e) => {
    e.preventDefault()
    this.setState({ends: Number(e.target.value)})
  }

  toggleForm = () => {
    this.setState({formVisible: !this.state.formVisible})
  }

  render() {
    const f = (date) => {
      const [y, m, d] = date.split('-')
      return `${d}/${m}/${y}`
    }

    if (this.state.formVisible === false) {
      return (
        <Button color='primary' onClick={this.toggleForm}>reserve a room</Button>
      )
      
    } else {
      var readonly = {};
      
      if( !this.state.searchEnabled  ) {
        readonly['readOnly'] = 'readOnly';
      }

      return (
      <div>
        <h2>reserve a room</h2>

        <form>
          <div className='hpadded5'>
            <span className='field__label100'>start date</span> 
            <input className='field__label150'
              type="date" 
              {...readonly}
              value={this.state.startDate} 
              onChange={this.startChanged}/>
          </div>
          <div>
            <span className='field__label100'>weeks </span>
            <input className='field__label50'
                value={this.state.difference}
                type="number" 
                onChange={this.weeksChanged} />  
            <div>
              <div className='field__label100'>
                ends
              </div>
              <div className='field__label100'>  
                {f(this.state.endDate)}
              </div> 
            </div>              
          </div>          
          <div className='hpadded5'>
            <span className='field__label100'>{this.state.date}</span>
            <span className='field__label50'>from</span>
            <input className='field__label50' 
                {...readonly} 
                type="number" 
                value={this.state.starts} 
                onChange={this.startTimeChanges}/> 
            <span className='field__label30'>to</span> 
            <input className='field__label50' 
                {...readonly} 
                type="number" 
                value={this.state.ends} 
                onChange={this.endTimeChanges}/>
          </div>

          <div className='hpadded5'>
            <Button className={ this.state.searchEnabled ? '' : 'hidden' } 
              onClick={this.searchForRooms} 
              color='primary'>
              search for a room
            </Button>   
            <Button 
              className={ this.state.searchEnabled ? 'hidden' : '' } 
              onClick={this.cancelSearchForRooms} 
              color='warning'>
              cancel
            </Button>                          
          </div>
        </form>

        <RoomSelector 
          roomsAvailable={this.state.roomsAvailable} 
          reserveRoom={this.reserveRoom} /> 

      </div>)
    }      


  }
}

export default withRouter(connect(
  (state) => ({reservations: state.reservations}),
  { addReservationForGroup }
)(NewRoomForm))