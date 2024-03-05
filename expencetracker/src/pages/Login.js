import React, { useState} from 'react';
import { unstable_HistoryRouter, useHistory } from 'react-router-dom';
import "./Login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
 
 
  const signup = () => {
    navigate("/signup");
  };
  const [formData, setFormData] = useState({
    email : "",
    password : "",
   });

  const handlelogin = async ()=>{
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { token } = await response.json();
      console.log(token);

      // Store token in localStorage or session storage
      localStorage.setItem('token', token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      // Handle error, show error message, etc.
    }
  }

  
   console.log(formData);
  
   function handleChange(event) {
     const { name, value, checked, type } = event.target;
     setFormData((prevState) => ({
       ...prevState,
       [name]: type === "checkbox" ? checked : value,
     }));
   }

  return (
    <div className="login">
      <div className="content">
        <div className="header">
          <div className="text-and-supporting-text">
            <div className="text">Log in to your account</div>
            <div className="supporting-text">
              Welcome back! Please enter your details.
            </div>
          </div>
        </div>
        <div className="content1">
          <div className="form">
                  
            <div className="input-field">
              <div className="text-and-supporting-text">
                <div className="text-and-supporting-text">
                  <div className="label">
                    <div className="email">Email</div>
                  </div>
                    <div className="examplgmailcom">
                    <input onChange={handleChange} type="email"  className='examplgmailcom examplgmailcom-wrapper' placeholder="Email" value={formData.email} name="email" required></input></div>
                </div>
              </div>
            </div>
            <div className="input-field1">
              <div className="text-and-supporting-text">
                <div className="text-and-supporting-text">
                  <div className="label1">
                    <div className="email" >Password</div>
                  </div>
                  <input onChange={handleChange} type="password"  className='examplgmailcom wrapper' placeholder="Password" name="password" value={formData.password} required>
                  </input>
                </div>
              </div>
            </div>
          </div>
          <div className="actions">
            
            <button onClick={handlelogin} className='examplgmailcom sign-in-wrapper'>Sign in</button>
            
            <div className="line-parent">
              <div className="frame-child" />
              <div className="email">OR</div>
              <div className="frame-child" />
            </div>
          </div>
        </div>
        <div className="row1">
          <div className="text3">Don’t have an account?</div>
          <div className="button1">
            <div className="button-base">
            <button className='email' onClick={signup}>Sign up</button>
            </div>
          </div>
        </div>
      </div>
      <div className="full-width-header-navigation">
        <div className="header1">
          <div className="container">
            <div className="label1">
              <div className="logo">
                <div className="frame-wrapper">
                  <img className="frame-icon" alt="" src="/frame.svg" />
                </div>
                <div className="text5">{`Expense Tracker `}</div>
              </div>
            </div>
            <div className="navigation-actions">
              <div className="button2">
                <div className="button-base2">
                  <button className="text5">Login</button>
                </div>
              </div>
               <button className='sign-up-wrapper' onClick={signup} >Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Login1() {
  return (Login())
}
