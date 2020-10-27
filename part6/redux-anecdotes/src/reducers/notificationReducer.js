const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTICE':
      return action.notification
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

export default notificationReducer