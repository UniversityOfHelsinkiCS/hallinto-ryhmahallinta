import React from 'react';
import {GroupsTeacher} from './GroupsTeacher'
import {GroupsRoom} from './GroupsRoom'

export const GroupPage = ({group, course, onRemoveTeacher, onSelectTeacher}) => {
  return (
    <div>
      <h2>{group.pva} {group.alkaa} - {group.loppuu}</h2>
      <p>group number: {group.nro}</p>
      <GroupsRoom
        group={group} 
        course={course}      
      />
      <GroupsTeacher 
        group={group} 
        course={course}
        onRemoveTeacher={onRemoveTeacher}
        onSelectTeacher={onSelectTeacher}
      />
    </div>)
}