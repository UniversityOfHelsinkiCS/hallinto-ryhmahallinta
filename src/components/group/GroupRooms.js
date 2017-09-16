import React from 'react'
import { Table } from 'reactstrap'
import NewRoomForm from './NewRoomForm'

const GroupRooms = ({group, course}) => {
  const byStartDate = (a,b) => a.alkamis_pvm<b.alkamis_pvm ? -1 : 1

  const f = (date) => {
    const d = new Date(date)
    return `${d.getDate()}.${d.getMonth()+1}.${d.getYear()+1900}`
  }

  return (
    <div>
      <Table>
        <tbody>
        {group.times.sort(byStartDate).map( (room, index) => (
          <tr key={index}>
            <td>{room.sali_nro}</td> 
            <td>{room.pva}</td>  
            <td>{room.alkaa} - {room.loppuu} </td> 
            <td>{f(room.alkamis_pvm)} ... {f(room.paattymis_pvm)} </td> 
          </tr> 
        ))}
        </tbody>
      </Table>
      <NewRoomForm
        group={group} 
        course={course}      
      />
    </div>
  )
}

export default GroupRooms