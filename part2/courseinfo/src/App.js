import React from 'react'
import Course from './components/course'

const App = ({courses}) => {
    return (
      <div>
          <h1>Web development curriculum</h1>
          {courses.map(course => <Course course={course} key={course.id}/>)} 
      </div>
    )
}

export default App