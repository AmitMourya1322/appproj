import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
const UserDetailsShort = () => {
  const navigate = useNavigate()
  
  // const {  isLoading, isError, message } = useSelector(
  //   (state) => state.goals
  // )
  // const {user} = useSelector((state)=>state.auth)
  
    const [users, setUsers] = useState([]);
    // useEffect(() => {
    //   if (isError) {
    //     console.log(message)
    //   }
  
    //   if (!user) {
    //     navigate('/Controllogin')
    //   }
  
     
    // }, [user, navigate, isError, message])


    useEffect(() => {
        fetch('http://localhost:8080/users/post')
          .then((res) => res.json())
          .then((data) => setUsers(data))
          .catch((err) => console.log(err));
      }, []);
      // if(isLoading){
      //   return <Spinner/>
      // }
    
  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Type of Emergency</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.mobile}</td>
              <td>{user.tEmg}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/post/${user._id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserDetailsShort
