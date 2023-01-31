import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/register.css'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [err, setErr] = useState(null)

  const handleChange = event => {
    setInput(prev=> ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async event => {
   
    event.preventDefault()
    try {
      const res = await axios.post("/auth/register", input)
      console.log(res)
      navigate("/login")
    }catch(err){
      console.log("ERROR", err)
      setErr(err.response.data)
      alert("User already exists")
    }
  }

  return (
      <div className='auth'>
          <h1>Sign up</h1>
          <form>
              <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
              <input required type='email' placeholder='email' name='email' onChange={handleChange}/>
              <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
              <button onClick={handleSubmit}>Sign up</button>
              {err && <span style={{color: 'red'}}>{err}</span>}
              <span className='span'>Already have an account?
                  <Link to='/login'> Log in here.</Link>
              </span>
          </form>
     
      </div>
    )
  }
  

export default Register
