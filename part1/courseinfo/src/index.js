import React from 'react'
import ReactDOM from 'react-dom'

// create elements for App includes:
// Header, Content, Total
const Header = (prop) => (
    <div>
        <h1>{prop.course}</h1>
    </div>
)

const Content = (props) => (
    <div>
        <Part part={props.part1} />
        <Part part={props.part2} />
        <Part part={props.part3} />
    </div>
)

const Total = (props) => (
    <div>
        <p>Number of exercises: {props.part1.exercises + 
            props.part2.exercises + props.part3.exercises}</p>
    </div>
)

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

const App = () => {
  const course = 'Half Stack application development'
  // exercise 3: send in objects
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} 
        part2={part2} 
        part3={part3} 
      />
      <Total part1={part1} 
        part2={part2} 
        part3={part3} 
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))