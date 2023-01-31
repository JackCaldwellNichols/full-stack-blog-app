import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import logo from '../images/logo.png'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'


const Navbar = () => {
  const navigate = useNavigate()
  const {currentUser, logout} = useContext(AuthContext)
  console.log(currentUser)

  const handleLogout = () => {
    navigate('/login')
    logout()    
  }
  
  return (
    <div className='navbar'>
      <div className='nav-container'>
        <div className='logo'>
          <Link to="/">
            <img src={logo} alt='' style={{width: '120px'}}/>
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/?cat=art'>
            <h6>
              ART 
            </h6>
          </Link>
          <Link className='link' to='/?cat=science'>
            <h6>
              SCIENCE 
            </h6>
          </Link>
          <Link className='link' to='/?cat=cinema'>
            <h6>
              CINEMA 
            </h6>
          </Link>  
          <Link className='link' to='/?cat=design'>
            <h6>
              DESIGN 
            </h6>
          </Link>  
          <Link className='link' to='/?cat=food'>
            <h6>
              FOOD 
            </h6>
          </Link>
          <Link to={`/profile/${currentUser.id}`} className='link'>
            <span className='nav-info'>{currentUser?.username}</span>
          </Link>
              {
                currentUser ? 
                 <span className='nav-info' onClick={handleLogout}>Logout</span>
                 :
                <Link to='/login' className='link'><span className='nav-info'>Login</span></Link>
              }
          <span className='write-a-post'>
              <Link to='/write' className='link'>
                Write
              </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
