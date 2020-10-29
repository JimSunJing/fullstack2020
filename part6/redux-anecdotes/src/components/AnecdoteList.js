import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genVote } from '../reducers/anecdoteReducer'
// import { notificationChange } from '../reducers/notificationReducer'
import { pushNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if (!state.filter || state.filter === '') {
      return state.anecdotes
    }else {
      return state.anecdotes.filter(a => {
        return a.content.indexOf(state.filter) !== -1
      })
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(genVote(id))
    dispatch(pushNotification(`you voted "${anecdotes.find(a => a.id === id).content}"`, 10))
  }
  return (
    <div>
      {anecdotes
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

export default AnecdoteList;