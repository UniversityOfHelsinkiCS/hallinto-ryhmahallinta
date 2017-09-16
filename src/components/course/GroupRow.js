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
    if ( group.times.length===0 ) {
      return (<div>ei salia</div>)
    }    
    return (
      <div>
        {group.times[0].alkaa} - {group.times[0].loppuu}
      </div>
    )
  }

  return(
    <tr>
      <td>
        <Link to={"/courses/"+course.id+"/groups/"+group.nro}>{group.nro}</Link>
      </td>
      <td>
        {group.times.length>0 ? group.times[0].pva : null}
      </td>       
      <td>
        {groupTime()}
      </td>      
      <td>
        {group.times.length>0 ? group.times[0].sali_nro : null}
      </td>
      <td>
        {teachers_of(group)} 
      </td>    
    </tr>
  )
}