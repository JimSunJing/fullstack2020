import React, { useState } from 'react'

const Blog = ({
  blog,
  num,
  updateBlog,
  currentUser,
  deleteBlog
}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    await updateBlog({
      ...blog,
      user: blog.user ? blog.user.id : '',
      likes: blog.likes + 1
    })
  }

  const handleDel = async () => {
    await deleteBlog({
      id: blog.id
    })
  }

  return (
    <div style={blogStyle} 
      className='blogDiv'
      id={`blogDiv-${num}`}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='urlAndLikes'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div className='url'>
          {blog.url}
        </div>
        <div className='likes'>
          likes {blog.likes}
          <button id='likeBtn' onClick={addLike}>like</button>
        </div>
        <div>
          {
            blog.user != null
              ? blog.user.username
              : ''
          }
        </div>
        {
          blog.user && currentUser && currentUser.username === blog.user.username
            ? <button
              id='delBtn' 
              onClick={handleDel}>delete</button>
            : <div />
        }
      </div>
    </div>
  )
}

export default Blog
