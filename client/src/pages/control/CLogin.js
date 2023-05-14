import React, { useContext, useState } from 'react'

import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'
const CLogin = () => {
  const [name,SetName] = useState('')
  const [password,setPassword] = useState('')
  const[redirect,setRedirect] = useState(false)

  const {setUserInfo} = useContext(UserContext)

  const login = async(ev)=>{
    ev.preventDefault();
    const response = await fetch('http://localhost:8080/controller/login', {
      method: 'POST',
      body: JSON.stringify({name, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/posts'} />
  }
  return (
    <div className='mainContainer'>

   
    <div className='container'>
    
    <form onSubmit={login} >
    <h1>Staff Login </h1>
       
     
       <input type="text"
      placeholder='Enter your name '
      name='name'
      value={name}
      onChange={ev=>SetName(ev.target.value)}
       />
       <input type="password"
      placeholder='Enter your password'
      name='password'
      value={password}
      onChange={ev=>setPassword(ev.target.value)}
       />
       <button type='submit'>Submit</button>
    </form>
  </div>
  </div>
  )
}

export default CLogin
