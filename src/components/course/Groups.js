import React from 'react'
import { Table } from 'reactstrap'
import { GroupRow } from './GroupRow'

export const Groups = ({groups, course}) => {
  return(
    <div>
      <h2>Groups</h2>
      <Table>
        <tbody>
          {groups.map(group => 
            <GroupRow
              key={group.nro} 
              group={group} 
              course={course}
            />
          )}
        </tbody>
      </Table>  
    </div>  
  )
}