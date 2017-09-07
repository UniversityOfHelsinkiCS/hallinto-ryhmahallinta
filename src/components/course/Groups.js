import React from 'react';
import { Table } from 'reactstrap';
import { GroupRow } from './GroupRow';

export const Groups = ({groups, course, onRemoveTeacher, onSelectTeacher}) => {
  return(
    <div>
      <h2>Ryhmät</h2>
      <Table>
        <tbody>
          {groups.map(group => 
            <GroupRow
              key={group.nro+group.alkamis_pvm} 
              group={group} 
              course={course}
            />
          )}
        </tbody>
      </Table>  
    </div>  
  )
}