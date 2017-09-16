const moment = require('moment')

const doNotIntersect = (reservedTime, need) => {

  if ( need.ends <= reservedTime.alkamisaika ) {
    return true
  }

  if ( need.starts >= reservedTime.paattymisaika ) {
    return true
  }

  const needStarts = moment(need.startDate, 'YYYY-MM-DD')
  const needEnds = moment(need.endDate, 'YYYY-MM-DD')

  const reservationStarts = moment(reservedTime['alkamis_pvm'], 'YYYY-MM-DD') 
  const reservationEnds = moment(reservedTime['paattymis_pvm'], 'YYYY-MM-DD') 

  if ( needStarts.isAfter(reservationEnds) ) {
    return true
  }

  if ( needEnds.isBefore(reservationStarts) ) {
    return true
  }

  return false
}

const roomFree = (reservationsOfRoom, need) => {
  const reservationsOfDay = reservationsOfRoom[need.day]
  if ( reservationsOfDay === undefined ) {
    return true
  }
   
  return reservationsOfDay.every( time => doNotIntersect(time, need) )
}

export const availableRooms = (reservations, need) => {
  return Object.keys(reservations)
          .filter( key => roomFree(reservations[key], need) )
          //.filter( room => ['A319', 'A307'].indexOf(room)!==-1) 
}

export const differenceInWeeks = (ends, starts) => {
  const startDate = moment(starts, 'YYYY-MM-DD')  
  const endDate = moment(ends, 'YYYY-MM-DD')

  return (endDate.isoWeeks() - startDate.isoWeeks()) + 1
}  

export const dayOfDate = (date) => {
  const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const dateObject = new Date(date)
  return days[dateObject.getDay()]
}

export const finnishDayOfDate = (date) => {
  const days = ["", "MA", "TI", "KE", "TO", "PE"]
  const dateObject = new Date(date)
  return days[dateObject.getDay()]
}

const p = (v) => v<10 ? `0${v}`: v

export const dateAfterWeeks = (date, weeks=1) => {
  const endDate = moment(date, 'YYYY-MM-DD').add(weeks-1, 'weeks')
  return `${endDate.year()}-${p(endDate.month()+1)}-${p(endDate.date())}` 
}