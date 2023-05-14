import React, { useState } from 'react'
import { useAuth } from '../context/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("")
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post(`/login`,{
        mobile,
        password,
      })
      if(data?.error){
        console.log(data.error)
      }
      else{
        localStorage.setItem("auth",JSON.stringify(data));
        setAuth({...auth,token:data.token,user:data.user})
        navigate(
          location.state||
          `/${data?.user?.role ===1 ? "UserSAdmin":"posts"}`
        )
      }
    }
    catch (err) {
      console.log(err);
     
    }
  }
  return (
    <div className='container'>
      
      <form onSubmit={handleSubmit} >
      <h1>Login For User</h1>
         <input type="number"
        placeholder='Enter your Phone Number'
        value={mobile}
        onChange={(e)=>setMobile(e.target.value)}
         />
         <input type="password"
        placeholder='Enter your password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
         />
         <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
