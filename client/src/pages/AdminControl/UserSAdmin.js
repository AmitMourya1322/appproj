import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UserSAdmin = () => {
  const navigate  =useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/users/post')
          .then((res) => res.json())
          .then((data) => setUsers(data))
          .catch((err) => console.log(err));
      }, []);
      const newForm = ()=>{
        navigate('/newForm')
      }
  return (
    <div>
      <h2>User List </h2>
      <button className='newForm' onClick={newForm}>New Form</button>
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
                <Link to={`/adminGet/${user._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserSAdmin
