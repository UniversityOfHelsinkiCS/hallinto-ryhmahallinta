const moment = require('moment')

const doNotIntersect = (reservedTime, need) => {

  //console.log(need.ends, reservedTime.alkamisaika, need.ends <= reservedTime.alkamisaika)
  if ( need.ends <= reservedTime.alkamisaika ) {
    //console.log("*")
    return true
  }

  //console.log(need.ends, reservedTime.alkamisaika, need.starts >= reservedTime.paattymisaika)
  if ( need.starts >= reservedTime.paattymisaika ) {
    //console.log("**")
    return true
  }

  const needStarts = moment(need.startDate, 'YYYY-MM-DD')
  const needEnds = moment(need.endDate, 'YYYY-MM-DD')

  const reservationStarts = moment(reservedTime['alkamis_pvm'], 'YYYY-MM-DD') 
  const reservationEnds = moment(reservedTime['paattymis_pvm'], 'YYYY-MM-DD') 

  // time of day intersect

  //console.log(needStarts.isAfter(reservationEnds) )
  if ( needStarts.isAfter(reservationEnds) ) {
    //console.log("**")
    return true
  }

  //console.log(needEnds.isBefore(reservationStarts))
  if ( needEnds.isBefore(reservationStarts) ) {
    //console.log("****")
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
  return Object.keys(reservations).filter( key => roomFree(reservations[key], need) )
}
