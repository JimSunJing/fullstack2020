import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const genRandomInt = (len) => {
        // generate random Integer
        let n = Math.floor(Math.random()*len)
        // console.log(n)
        return n
    }

    const addVote = (i) => {
        setVotes(votes.map(
            (val, index) => {
                return index === i ? val+1 : val
            }
        ))
    }

    return (
        <>
            <div>
                {props.anecdotes[selected]}
            </div>
            <p>has {votes[selected]} votes</p>
            <button onClick={() => addVote(selected)}>vote for this one</button>
            <button onClick={() => 
                setSelected(genRandomInt(props.anecdotes.length))}>
                    next anecdote
            </button>
        </>

    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);

