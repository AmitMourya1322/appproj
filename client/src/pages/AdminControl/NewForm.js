import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const NewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    address: "",
    NbLandmark: "",
    tEmg: "",
    aCasulties: "",
    aPinvolved: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/controller/newForm",
        formData
      );
      console.log(response);
      return <Navigate to='/adminGet'/>
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="formContainer">
      <h2>New Form</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Mobile:</td>
              <td>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Near by Landmark:</td>
              <td>
                <input
                  type="text"
                  name="NbLandmark"
                  value={formData.NbLandmark}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Type of Emergency:</td>
              <td>
                <input
                  type="text"
                  name="tEmg"
                  value={formData.tEmg}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Any Casualties:</td>
              <td>
                <input
                  type="number"
                  name="aCasulties"
                  value={formData.aCasulties}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Any Person Involved:</td>
              <td>
                <input
                  type="text"
                  name="aPinvolved"
                  value={formData.aPinvolved}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewForm;
