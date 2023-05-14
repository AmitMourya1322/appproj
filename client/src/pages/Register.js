import React from 'react'

const Register = () => {
  return (
    <div className='mainContainer'>

   
    <div className='container'>
    
    <form >
    <h1>Registration For User</h1>
        <input type="text" 
        placeholder='Enter your name' />
     
       <input type="number"
      placeholder='Enter your Phone Number'
       />
       <input type="password"
      placeholder='Enter your password'
       />
       <button type='submit'>Submit</button>
    </form>
  </div>
  </div>
  )
}

export default Register
