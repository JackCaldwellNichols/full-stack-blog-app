import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import '../styles/post.css'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'




const Post = () => {
  const [post, setPost] = useState({})
  console.log("&&&&",post)
  const navigate = useNavigate()
  const location = useLocation()

  const postId = location.pathname.split('/')[2]
  console.log(location)

  const {currentUser} = useContext(AuthContext)

  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${postId}`)
    }catch (err) {
      console.log(err) 
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`/posts/${postId}`)
        setPost(response.data)
       
      }catch (err) {
        console.log(err) 
      }
    }
    fetchData()
  }, [postId])


  return (
    <div className='single'>
      <div className='post-content'>
        <img src={`../upload/${post?.img}`} alt='' style={{width: '100%', height: '300px', objectFit: 'cover'}}/>
        <div className='user'>
          
           <img src={`../upload/${post?.userImage}`} alt='' className="user-img"/>
          
          <div className="info">
            <span>{post.username}</span>
            <p className='post-time'>Posted {moment(post.date).fromNow()}</p>
         </div>
         {currentUser.username === post.username && (
             <div className='edit'>
             <Link to={`/write?edit=2`} className='modify' state={post}>
               <i className="fa fa-edit"></i>
             </Link>
               <i className="delete fa fa-trash" onClick={handleDelete}></i>
            </div>
         )}
        </div>
        <h1 style={{fontSize: '45px'}}> {post.title}</h1>
        <span style={{textAlign:'justify', lineHeight: '30px'}}>{post.desc}</span>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Post
