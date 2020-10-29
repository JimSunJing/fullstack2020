import React from 'react'
import { useDispatch } from 'react-redux'
import { genAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecodoteService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const data = await anecdoteService.createNew(content)
    dispatch(genAnecdote(data))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm