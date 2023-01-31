import React, {useContext, useState, useEffect} from 'react'
import '../styles/profile.css'
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
 
    const [file, setFile] = useState('')
    const [profile, setProfile] = useState({
        email: currentUser.email,
        id: currentUser.id,
        img: currentUser.img,
        username: currentUser.username
    })


    const upload = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axios.put("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          try{
            const response = await axios.get(`/users/${currentUser.id}`)
            setProfile(response.data)
            console.log("userINFO", response.data)
            console.log("LOGGED", currentUser)
          }catch (err) {
            console.log(err) 
          }
        }
        fetchData()
      }, [])


      const handleSubmit = async event => {
        event.preventDefault()
        const imgUrl = await upload()
        try {
            const res = await axios.put(`/users/${currentUser.id}`, {
            
            img:file ? imgUrl : "",})
            
        }catch(error) {
                console.log(error)
        }
    }
    

  return (
    <div className='bio'>
        <div>
            <img src={`../upload/${profile.img}`} alt='' style={{width: '300px', height: '300px', objectFit: 'cover'}}/>
            <input type='file' name='' style={{display: 'none'}} id='file' onChange={event => setFile(event.target.files[0])}/><br></br>
            <label className='file' htmlFor='file'>Change image</label>
            <button  onClick={handleSubmit}>Upload</button>
        </div>
        <div>
             <h3>Hi there, {profile.username}!</h3>
             <p>{profile.email}</p>
        </div>
       

    </div>
  )
}

export default Profile
