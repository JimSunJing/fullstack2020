const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTICE':
      return action.notification
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTICE',
    notification
  }
}

export const pushNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTICE',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default notificationReducer