import React from 'react';
import { Container, Table } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { CoursePage } from '../course';

const CoursesOfTerm = ({courses, year, term}) => { 
  return (
    <div>
      <h1>Kurssit {term} {year} </h1>
      <Table>
         <tbody>
          {courses.map( course => 
            <CourseRow course={course} key={course.id}/>
          )}
        </tbody>
      </Table>
    </div>
  )
} 

const CourseRow = ({course}) => (
  <tr>
    <td>
      <Link to={"/courses/"+course.id}>{course.nimi}</Link>  
    </td>
    <td>
      {course.lukuvuosi}
    </td>
  </tr>
) 

const Term = ({courses, year, term, onRemoveTeacher, onSelectTeacher}) => {
    const courseById = (id) => courses.find( course => course.id === id )
    return (   
      <Container>
          <Route exact path='/' render={() => 
            <CoursesOfTerm courses={courses} year={2017} term={'Syksy'} />
          }/>
          <Route path='/courses/:id' render={({match}) => 
            <CoursePage 
              course={courseById(match.params.id)} 
            /> 
          }/>        
      </Container>
  )
}

export default withRouter(connect(
  (state) => ({ courses: state.courses})
)(Term)) 