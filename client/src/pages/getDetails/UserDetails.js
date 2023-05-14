import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // import useParams

const UserDetails = () => { // remove match from props
  const [user, setUser] = useState(null);
  const { id } = useParams(); // access the route param using useParams hook

  useEffect(() => {
    fetch(`http://localhost:8080/users/post/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [id]); // use id instead of match.params.id

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{user.mobile}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{user.address || '-'}</td>
          </tr>
          <tr>
            <td>Nearby Landmark</td>
            <td>{user.NbLandmark || '-'}</td>
          </tr>
          <tr>
            <td>Type of Emergency</td>
            <td>{user.tEmg || '-'}</td>
          </tr>
          <tr>
            <td>Any Casualties</td>
            <td>{user.aCasulties || '-'}</td>
          </tr>
          <tr>
            <td>Any Person Involved</td>
            <td>{user.aPinvolved || '-'}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
