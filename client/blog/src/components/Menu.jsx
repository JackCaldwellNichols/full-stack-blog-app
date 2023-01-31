import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../styles/menu.css'
import { Link } from 'react-router-dom'

const Menu = ({cat}) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`/posts/?cat=${cat}`)
        setPosts(response.data)
      }catch (err) {
        console.log(err) 
      }
    }
    fetchData()
  }, [cat])

 

  return (
    <div className='main-menu'>
        <h1 style={{fontSize: '20px', color: '#555'}}>Other posts you may like:</h1>
        {posts.map(post => (
            <div className='post-menu' key={post.id}>
                <img src={`../upload/${post.img}`} alt=''className='img-menu'/>
                <h2 style={{color: '#555'}}>{post.title}</h2>
                <Link to={`/post/${post.id}`} className='link'>
                     <button className='read-more'>Read more</button>
                </Link>
              
            </div>
        ))}
    </div>
  )
}

export default Menu
