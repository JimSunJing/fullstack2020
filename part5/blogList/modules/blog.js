const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog