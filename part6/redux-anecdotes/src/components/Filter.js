import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    const key = event.target.value
    props.filterChange(key)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterChange }
)(Filter)