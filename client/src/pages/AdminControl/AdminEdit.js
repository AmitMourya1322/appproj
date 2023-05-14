import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css'
function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [admit, setAdmit] = useState({
    name: '',
    mobile: '',
    address: '',
    NbLandmark: '',
    tEmg: '',
    aCasulties: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/post/${id}`)
      .then((response) => {
        setAdmit(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmit({
      ...admit,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/controller/create/${id}`, admit)
      .then((response) => {
        console.log(response.data);
        // navigate to the adminGet route after successful update
        navigate('/adminGet');
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };
  

  return (
    <div className="formContainer">
     
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={admit.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Mobile:
        <input
          type="text"
          name="mobile"
          value={admit.mobile}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={admit.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Near by Landmarks:
        <input
          type="text"
          name="NbLandmark"
          value={admit.NbLandmark}
          onChange={handleChange}
        />
      </label>
      <label>
        Type of Emergency:
        <input
          type="text"
          name="tEmg"
          value={admit.tEmg}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Casualties:
        <input
          type="number"
          name="aCasulties"
          value={admit.aCasulties}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update</button>
    </form>
    </div>
  );
}

export default AdminEdit;
