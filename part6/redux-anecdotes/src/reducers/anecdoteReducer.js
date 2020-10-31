import anecodoteService from '../services/anecodoteService'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type){
    case ('VOTE'):
      return [...state.filter(a => a.id !== action.data.id), action.data]
    case ('ADD'):
      return [...state, action.data]
    case ('INIT'):
      return action.data
    default: return state
  }
}

export default reducer

// exercise 6.6
export const genVote = id => {
  return async dispatch => {
    const old =  await anecodoteService.getById(id)
    const newObj = {
      ...old,
      votes: old.votes + 1
    }
    const data =  await anecodoteService.update(newObj)
    dispatch({
      type: 'VOTE',
      data: data
    })
  }
}

// export const genAnecdote = content => ({
//   type: 'ADD',
//   data: asObject(content)
// })

export const genAnecdote = (content) => {
  return async dispatch => {
    const data = await anecodoteService.createNew(content)
    return dispatch({
      type: 'ADD',
      data
    })
  }
}

export const initAnecodotes = () => {
  return async dispatch => {
    const data = await anecodoteService.getAll()
    return dispatch({
      type: 'INIT',
      data
    })
  }
}