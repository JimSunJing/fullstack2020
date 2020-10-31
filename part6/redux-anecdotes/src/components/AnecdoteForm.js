import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { genAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.genAnecdote(content)
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

export default connect(
  null,
  { genAnecdote }
)(AnecdoteForm)