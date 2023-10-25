import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {

    const {id} = useParams()
    const Navigate = useNavigate()
    const [inputData,setInputData] = useState({
        id:id,
      name:"",
      email:"",
      course:"",
      tutor:""
    })

    useEffect(()=>{
        axios.get("http://localhost:5367/user/"+id)
        .then(res=>setInputData(res.data))
        .catch(err=>console.log(err))
    },[])

    const handleSubmit = (e)=>{
      e.preventDefault();
      axios.put("http://localhost:5367/user/"+id,inputData).then(res=>{
        alert("Updated Succesfully")
      }).catch(err=>console.log(err))
    }

  return (
    <div className='d-flex justify-content-center w-100 vh-100 align-items-center '>
    <div className='w-50 border bg-secondary text-light p-5'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID: </label>
          <input type="text" disabled name='name' className='form-control'  value={inputData.id} />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name='name' className='form-control' onChange={e=>setInputData({...inputData,name:e.target.value})} value={inputData.name} />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" name='email' className='form-control' onChange={e=>setInputData({...inputData,email:e.target.value})} value={inputData.email}/>
        </div>
        <div>
          <label htmlFor="course">Course: </label>
          <input type="text" name='course' className='form-control' onChange={e=>setInputData({...inputData,course:e.target.value})} value={inputData.course}/>
        </div>
        <div>
          <label htmlFor="tutor">Tutor: </label>
          <input type="text" name='tutor' className='form-control' onChange={e=>setInputData({...inputData,tutor:e.target.value})} value={inputData.tutor}/>
        </div><br />
        <button className='btn btn-success'>Success</button>
      </form>
    </div>
  </div>  )
}

export default Update