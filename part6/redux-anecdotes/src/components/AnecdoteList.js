import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { genVote } from '../reducers/anecdoteReducer'
// import { notificationChange } from '../reducers/notificationReducer'
import { pushNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  // const anecdotes = useSelector(state => {
  //   if (!state.filter || state.filter === '') {
  //     return state.anecdotes
  //   }else {
  //     return state.anecdotes.filter(a => {
  //       return a.content.indexOf(state.filter) !== -1
  //     })
  //   }
  // })
  // const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    props.genVote(id)
    props.pushNotification(`you voted "${props.anecdotes.find(a => a.id === id).content}"`, 10)
  }
  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  );
};

// export default AnecdoteList;

const mapStateToProps = state => {
  if (!state.filter || state.filter === '') {
    return {
      anecdotes: state.anecdotes
    }
  } else {
    return {
      anecdotes: state.anecdotes.filter(a => {
        return a.content.indexOf(state.filter) !== -1
      })
    }
  }
}

const mapDispatchToProps = {
  genVote,
  pushNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList