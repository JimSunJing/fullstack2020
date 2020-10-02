const info = (...Params) => {
  if (process.env.NODE_ENV !== 'test'){
    console.log(...Params)
  }
}

const warning = (...Params) => {
  console.log(...Params)
}

module.exports = { info, warning }