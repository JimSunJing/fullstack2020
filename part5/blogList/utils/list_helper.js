const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, curr) => {
    return prev + curr.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, curr) => {
    if (curr.likes > prev.likes) {
      return curr
    }
    return prev
  }
  return blogs.reduce(reducer)
}

// exercise 4.6
const mostBlogs = (blogs) => {
  const author = _.orderBy(blogs, ['author'], ['desc'])[0]['author']
  const blogCount = _.countBy(blogs, 'author')[author]
  return {
    author: author,
    blogs: blogCount
  }
}

const mostlike = (blogs) => {
  const reducer = (prev, curr) => {
    const name = curr.author
    const query = _.find(prev, { name: name })
    if (query) {
      query['likes'] += curr.likes
    } else {
      prev.push({
        name: name,
        likes: curr.likes
      })
    }
    return prev
  }
  const likeCount = blogs.reduce(reducer, [])
  // console.log(likeCount)
  const mostLikeAuthor = _.orderBy(likeCount, ['likes'], ['desc'])[0]
  return {
    author: mostLikeAuthor.name,
    likes: mostLikeAuthor.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostlike
}