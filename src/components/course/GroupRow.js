import React from 'react';
import { Link } from 'react-router-dom';

export const GroupRow = ({course, group}) => {
  const teachers_of = (group) => {
    if (group.teachers.length===0) {
      return "no teachers assigned"
    } 

    return group.teachers.map(t=>t.nimi).join(', ')
  }
  
  const groupTime = () => {
    if ( group.nro === 1) {
      return (<div>jono</div>)
    }
    return (
      <div>
        {group.alkaa} - {group.loppuu}
      </div>
    )
  }

  return(
    <tr>
      <td>
        <Link to={"/courses/"+course.id+"/groups/"+group.nro}>{group.nro}</Link>
      </td>
      <td>
        {group.pva}
      </td>       
      <td>
        {groupTime()}
      </td>      
      <td>
        {group.sali_nro}
      </td>
      <td>
        {teachers_of(group)} 
      </td>    
    </tr>
  )
}