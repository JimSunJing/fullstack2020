import React from 'react'

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

export default Course 