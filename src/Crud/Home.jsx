import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function Home() {
    const [data,setData] = useState([])
k
    const succesmsg = ()=>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            icon: 'success',
            title: 'Added successfully'
        })
    }

    const handleDelete = (id)=>{
        const confirm = window.confirm("Do you like to Delete ?")
        if(confirm){
            axios.delete("http://localhost:5367/user/"+id)
        .then(res=>{
            alert("Record Deleted")
        })
        }
        
    }

    const read = (d)=>{
        Swal.fire({
            title: `${d.name}`,
            text: `Email : ${d.email}`,
            html:
                `Email :  ${d.email} <br/>`+
                `Course : ${d.course} <br/>`+
                `Tutor : ${d.tutor}`
        })
    }
    
    const createpop = async ()=>{
        
        const { value: formValues } = await Swal.fire({
            title: 'Enter your',
            html:
            `<input id="swal-input1" class='form-control' placeholder='Name' type="text"  /> <br/>`+
            `<input id="swal-input2" class='form-control' placeholder='Email' type="email" /> <br/>`+
            `<input id="swal-input3" class='form-control' placeholder='Course' type="text" /> <br/>`+
            `<input id="swal-input4" class='form-control' placeholder='Tutor' type="text" /> <br/>`, 
            focusConfirm: false,
            preConfirm: () => {
                let resultObject = {
                    name: document.getElementById('swal-input1').value,
                    email: document.getElementById('swal-input2').value,
                    course: document.getElementById('swal-input3').value,
                    tutor: document.getElementById('swal-input4').value
                }
                if (!resultObject.name || !resultObject.email || !resultObject.course || !resultObject.tutor) {
                    Swal.fire({
                        title: 'You need to enter full details',
                        icon: 'error'
                    })
                    return null
                }else{
                    axios.post("http://localhost:5367/user",resultObject)
                    .then(res=>{
                        succesmsg()
                    }).catch(err=>console.log(err))
                }
                return resultObject
            },
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel'
        })
    }

    const handleUpdate = async (d)=>{
        
        const { value: formValues } = await Swal.fire({
            title: 'Update Your',
            html:
            `<input id="swal-input1" class='form-control' value=${d.name} type="text"  /> <br/>`+
            `<input id="swal-input2" class='form-control' value=${d.email} type="email" /> <br/>`+
            `<input id="swal-input3" class='form-control' value=${d.course} type="text" /> <br/>`+
            `<input id="swal-input4" class='form-control' value=${d.tutor} type="text" /> <br/>`, 
            focusConfirm: false,
            preConfirm: () => {
                let resultObject = {
                    name: document.getElementById('swal-input1').value,
                    email: document.getElementById('swal-input2').value,
                    course: document.getElementById('swal-input3').value,
                    tutor: document.getElementById('swal-input4').value
                }
                if (!resultObject.name || !resultObject.email || !resultObject.course || !resultObject.tutor) {
                    Swal.fire({
                        title: 'You need to enter full details',
                        icon: 'error'
                    })
                    return null
                }else{
                    axios.put(`http://localhost:5367/user/${d.id}`,resultObject)
                    .then(res=>succesmsg())
                    .catch(err=>console.log(err))
                }
                return resultObject
            },
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel'
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:5367/user')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[handleDelete])
    
  return (
    <div className='container mt-5'>
        
        <h2>CRUD App</h2>
        {/* <Link to={'/create'} className='btn btn-success'>Create +</Link> */}
        <button onClick={createpop}  className='btn btn-success'>Create +</button>
        <table className='table shadow border mt-4'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    <th>Course</th>
                    <th>Tutor</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d, i)=>(
                        
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.course}</td>
                            <td>{d.tutor}</td>
                            <td style={{gap:"10px"}} className='d-flex'>
                                {/* <Link to={`/update/${d.id}`} className='btn btn-primary'>Update</Link> */}
                                <button className='btn btn-primary' onClick={()=>handleUpdate(d)} >Update</button>
                                <button className='btn btn-danger' onClick={()=>handleDelete(d.id)}>Delete</button>
                                <button className='btn btn-info' onClick={()=>read(d)}>Read</button>

                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Home