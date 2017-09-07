import React from 'react';
import { Link } from 'react-router-dom';

export const GroupRow = ({course, group}) => {
  const teachers_of = (group) => {
    if (group.teachers.length===0) {
      return "no teachers assigned"
    } 

    return group.teachers.map(t=>t.nimi).join(', ')
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
        {group.alkaa} - {group.loppuu}
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