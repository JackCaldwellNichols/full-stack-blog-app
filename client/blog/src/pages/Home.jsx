import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/home.css'
import axios from 'axios'

const Home = () => {

  const [posts, setPosts] = useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`/posts${cat}`)
        setPosts(response.data)
      }catch (err) {
        console.log(err) 
      }
    }
    fetchData()
  }, [cat])

  

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map(post => (
          <div className='post' key={post.id}>
           <div className="img">
            <img src={`../upload/${post.img}`} alt='' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
           </div>
           <div className="content">
         
              <h1 className='title'>{post.title}</h1>
         
              <p className='post-desc'>{getText(post.desc)}</p>
              <Link to={`/post/${post.id}`} className='link'>
              <button className='read-more'>Read more</button>
              </Link>
           </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
