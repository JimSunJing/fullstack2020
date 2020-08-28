import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Anecdote = (props) => {
    const {anecdote, vcount} = props
    return (
        <>
            <div>{anecdote}</div>
            <p>has {vcount} votes</p>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
    // top Vote Status [position, votes]
    const [topVote, setTopVote] = useState([0, 0])

    const genRandomInt = (len) => {
        // generate random Integer
        let n = Math.floor(Math.random()*len)
        // console.log(n)
        return n
    }

    const addVote = () => {
        setVotes(votes.map(
            (val, index) => {
                return index === selected ? val+1 : val
            }
        ))
        // if exceed the top vote need to change the top voe
        if (votes[selected]+1 >= topVote[1]){
            setTopVote([selected, votes[selected]+1])
        }
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={props.anecdotes[selected]} vcount={votes[selected]} />

            <button onClick={() => addVote()}>vote for this one</button>
            <button onClick={() => setSelected(
                genRandomInt(props.anecdotes.length))}> next anecdote
            </button>

            <h1>Anecdote with most vote</h1>
            <Anecdote anecdote={props.anecdotes[topVote[0]]} vcount={topVote[1]} />
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

