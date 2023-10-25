import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Read() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [data,setData] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5367/user/"+id)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <div>
        {
                <div>
                    <p>ID {data.id}</p>
                    <p>Name {data.name}</p>
                    <p>Course {data.course}</p>
                    <p>Tutor {data.tutor}</p>
                </div>
        }

    </div>
  )
}

export default Read