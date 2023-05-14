import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import {toast} from 'react-toastify'
import { register,reset } from '../../features/auth/authSlice';
const CRegister = () => {
  const [formData,setFormData] = useState({
    name:'',
    password:''

  })

  const {name,password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user,isLoading,isError,isSuccess,message}= useSelector(
    (state)=>state.auth
  )

  useEffect(()=>{
    if(isError){
        toast.error(message)
    }
    if(isSuccess || user){
        navigate('/')
    }
    dispatch(reset())
},[user,isError,isSuccess,message,navigate,dispatch])
const onChange=(e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
}

const onSubmit=(e)=>{
  e.preventDefault()
 
      const userData ={
          name,password
      }
      dispatch(register(userData))
  }


if(isLoading){
  return <Spinner/>
}
  return (
    <div className='mainContainer'>

   
    <div className='container'>
    
    <form onSubmit={onSubmit}>
    <h1>Control Register  </h1>
       
     
       <input type="Text"
      placeholder='Enter your name '
      name='name'
      onChange={onChange}
       />
       <input type="password"
      placeholder='Enter your password'
      name='password'
      onChange={onChange}
       />
       <button type='submit'>Submit</button>
    </form>
  </div>
  </div>
  )
}

export default CRegister
