import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { AuthContext } from '../context/authContext'


const Login = () => {
  const navigate = useNavigate()

  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  const {login} = useContext(AuthContext)

  const handleChange = event => {
    setInput(prev=> ({...prev, [event.target.name]: event.target.value}))
  }

  const [err, setErr] =useState(null)

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await login(input)
      navigate("/")
    }catch(err){
      console.log("ERROR", err)
      setErr(err.response.data)
    }
  }




  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input type='text' placeholder='username' onChange={handleChange} name='username'/>
            <input type='password' placeholder='password' onChange={handleChange} name='password'/>
            <button onClick={handleSubmit}>Login</button>
            {err && <span className='error'>{err}</span>}
            <span>Don't have an account?
                <Link to='/register'> Sign up here.</Link>
            </span>
        </form>
   
    </div>
  )
}

export default Login
