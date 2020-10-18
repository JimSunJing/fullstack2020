import React from 'react';
import { useDispatch } from 'react-redux';
import { genAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    dispatch(genAnecdote(event.target.content.value))
    event.target.content.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='content'/></div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AnecdoteForm