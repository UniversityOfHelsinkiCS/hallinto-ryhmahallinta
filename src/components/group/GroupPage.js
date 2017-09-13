import React from 'react';
import GroupsTeacher from './GroupsTeacher'
import GroupsRoom from './GroupsRoom'

export const GroupPage = ({group, course, onRemoveTeacher, onSelectTeacher}) => {
  const format = (date) => {
    const d = new Date(date)
    return `${d.getDate()}.${d.getMonth()+1}.${d.getYear()+1900}`
  }

  const header = () => {
    if (group.nro === 1) {
      return(
        <div className='hpadded10'>
          jonotusryhmä
        </div>
      )
    }

    if (group.alkaa===null) {
      return(
        <div className='hpadded10'>
          <p>group number: {group.nro}</p>   
          <p>time not specified</p>
        </div>
      )      
    }

    return (
      <div className='hpadded10'>
        <h2>{group.pva} {group.alkaa} - {group.loppuu}</h2>
        <p>{format(group.alkamis_pvm)} - {format(group.paattymis_pvm)}</p> 
        <p>group number: {group.nro}</p>   
        <p>room: {group.sali_nro}</p>  
      </div>
    )
  }

  return (
    <div>
      {header()} 
      <GroupsRoom
        group={group} 
        course={course}      
      />
      <GroupsTeacher 
        group={group} 
        course={course}
      />
    </div>)
}