import React, {useState} from 'react'
import '../styles/write.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  
  const state = useLocation().state
  console.log(state)
  const navigate = useNavigate()
  
  
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(state?.cat || "")

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault()
    const imgUrl = await upload()

    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title, 
        desc:value, 
        cat:cat,
        img:file ? imgUrl : "",
        
      }) 
      : await axios.post(`/posts/`, {
        title:title,
        desc:value, 
        cat:cat,
        img:file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='add'>
      
      <div className='write-content'>
        <div className='title-input'>
          <input type='text' placeholder='Title' value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div className="editorContainer" >
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='write-menu'>
        <div className='item1'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input type='file' name='' style={{display: 'none'}} id='file' onChange={event => setFile(event.target.files[0])}/><br></br>
          <label className='file' htmlFor='file'>Upload image</label>
         
            <button className='button'>Save as draft</button>
            <button className='button' onClick={handleSubmit}>Publish</button>
    
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cats'>
            <div className='cat'>
              <input type='radio' checked={cat === "art"} name='cat' value='art' id='art'  onChange={event => setCat(event.target.value)}/>
              <label htmlFor='art'>Art</label>
            </div>
            <div className='cat'>
              <input type='radio' checked={cat === "science"} name='cat' value='science' id='science'  onChange={event => setCat(event.target.value)}/>
              <label htmlFor='science'>Science</label>
            </div>
            <div className='cat'>
              <input type='radio'  checked={cat === "tecnnology"} name='cat' value='tecnnology' id='technology'  onChange={event => setCat(event.target.value)}/>
              <label htmlFor='technology'>Technology</label>
            </div>
            <div className='cat'> 
              <input type='radio' checked={cat === "cinema"} name='cat' value='cinema' id='cinema'  onChange={event => setCat(event.target.value)}/>
              <label htmlFor='art'>Cinema</label>
            </div>
            <div className='cat'> 
              <input type='radio' checked={cat === "design"} name='cat' value='design' id='design'  onChange={event => setCat(event.target.value)}/>
              <label htmlFor='design'>Design</label>
            </div>
            <div className='cat'> 
              <input type='radio' checked={cat === "food"} name='cat' value='food' id='food'  onChange={event => setCat(event.target.value)}/>
              <label htmlFor='food'>Food</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
