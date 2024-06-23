import { useState } from "react";
import axios from 'axios';

import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleUserRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      
      if(response.status === 201){
        console.log(response.data.data.token)
        console.log(formData)
      }
      
    } catch (error) {
      console.log(error.response.data.error)
    }

  }


  return (
    <div className="App">
      <form onSubmit={handleUserRegister}>
        <div className="form-group">
          <label htmlFor="fullname">Enter FullName</label>
          <input 
            type="text" 
            name="fullname" 
            id="fullname" 
            value={formData.fullname} 
            onChange={handleChange}   
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Enter Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            value={formData.email} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
          <p>OR</p>
          <button type="button">Login</button>
        </div>
      </form>
    </div>
  );
}

export default App;
