import React from 'react';
import { Groups } from './Groups';
import { GroupPage } from './../group';
import { Route } from 'react-router-dom';

export const CoursePage = ({course, onRemoveTeacher, onSelectTeacher}) => {
  if ( course == null ) {
    return <div>loading...</div>
  }

  const exerciseGroups = (groups) => {
    return course.groups.filter( group => group.nro!==0)
  }

  const groupWithId = (id) => {
    return course.groups.find( group => Number(group.nro)===Number(id) )
  }  

  return(
    <div>
      <h1>{course.nimi}</h1>

      <Route exact path='/courses/:id' render={() => 
        <Groups groups={exerciseGroups()} course={course} /> 
      }/>
      <Route exact path='/courses/:id/groups/:group_id' render={({match}) => 
        <GroupPage 
          course={course} 
          group={groupWithId(match.params.group_id)}
          onRemoveTeacher={onRemoveTeacher}
          onSelectTeacher={onSelectTeacher}
        />
      }/> 
    </div>
  )
}