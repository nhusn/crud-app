import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


function Create() {
  const Navigate = useNavigate()
  const [inputData,setInputData] = useState({
    name:"",
    email:"",
    course:"",
    tutor:""
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5367/user",inputData).then(res=>{
      alert("Uploded Succesfully")
      Navigate('/')
    })
  }
  
console.log(inputData);
  return (
    <div className='d-flex justify-content-center w-100 vh-100 align-items-center '>
      <div className='w-50 border bg-secondary text-light p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name='name' className='form-control' onChange={e=>setInputData({...inputData,name:e.target.value})} />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name='email' className='form-control' onChange={e=>setInputData({...inputData,email:e.target.value})}/>
          </div>
          <div>
            <label htmlFor="course">Course: </label>
            <input type="text" name='course' className='form-control' onChange={e=>setInputData({...inputData,course:e.target.value})}/>
          </div>
          <div>
            <label htmlFor="tutor">Tutor: </label>
            <input type="text" name='tutor' className='form-control' onChange={e=>setInputData({...inputData,tutor:e.target.value})}/>
          </div><br />
          <button className='btn btn-success'>Success</button>
        </form>
      </div>
    </div>
  )
}

export default Create