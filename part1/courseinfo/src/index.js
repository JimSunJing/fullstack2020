import React from 'react'
import ReactDOM from 'react-dom'

// create elements for App includes:
// Header, Content, Total
const Header = (prop) => (
    <div>
        <h2>{prop.course}</h2>
    </div>
)

const Content = (props) => {
    const parts = props.parts

    return (
        <div>
            {parts.map(p => <Part part={p} key={p.id} />)}
        </div>
    )
}


const Total = (props) => {
    // exercise 2.4
    const total = props.parts.reduce( (acc, curr) => {
        return acc+curr.exercises
    },0)
    return (
        <div>
            <p><b>total of {total} exercises </b></p>
        </div>
    )
}

// exercise 1.2: breakdown Contents
const Part = (props) => {
    // console.log(props.part)
    return (
        <div>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </div>
    )
}

// exercise 2.1
const Course = ({course}) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}


const App = () => {
  // exercise 1.3: send in objects
  // exercise 1.4: send in a array
  // exercise 1.5: make course a whole object
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => <Course course={course} key={course.id}/>)} 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))