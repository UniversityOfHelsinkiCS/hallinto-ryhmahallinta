import React from 'react';
import GroupsTeacher from './GroupsTeacher'
import GroupRooms from './GroupRooms'

export const GroupPage = ({group, course}) => {

  const groupInfo = group.nro !== 1 ? `group number: ${group.nro}` : 'jonotusryhmä' 

  return (
    <div>
      <div className='hpadded10'>
        <p>{groupInfo}</p>        
      </div>
      <GroupRooms group={group} course={course} />
      <GroupsTeacher group={group} course={course} />
    </div>)
}