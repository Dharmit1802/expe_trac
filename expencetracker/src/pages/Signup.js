import React, { useState } from 'react'
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const submit = async () => {
    const res =await fetch("http://localhost:3000/api/v1/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
    
  });
  

    navigate("/");
  
   
    console.log(res);
  };

  const signin = () => {
    // navigate('/signin');
    window.location.href = "/";
  };

  const [formData, setFormData] = useState({
    name : "",
    email : "",
    password : "",
    password2 : ""
   });
  
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
            <div className="text">Create your account</div>
            <div className="supporting-text">
              Please enter your details ✌️.
            </div>
          </div>
        </div>
        <div className="content1">
          <div className="form">
            <div className="input-field">
              <div className="text-and-supporting-text">
                <div className="text-and-supporting-text">
                  <div className="label">
                    <div className="email">Name</div>
                  </div>
                    <div className="examplgmailcom">
                    <input onChange={handleChange} type="text" max="15"  className='examplgmailcom examplgmailcom-wrapper' placeholder="Name" name="name" value={formData.name} required></input></div>
                </div>
              </div>
            </div>                 
            <div className="input-field">
              <div className="text-and-supporting-text">
                <div className="text-and-supporting-text">
                  <div className="label">
                    <div className="email">Email</div>
                  </div>
                    <div className="examplgmailcom">
                    <input onChange={handleChange} type="email"  className='examplgmailcom examplgmailcom-wrapper' placeholder="Email" name="email" value={formData.email} required></input></div>
                </div>
              </div>
            </div>
            <div className="input-field1">
              <div className="text-and-supporting-text">
                <div className="text-and-supporting-text">
                  <div className="label1">
                    <div className="email"> Create Password</div>
                  </div>
                  <input onChange={handleChange} type="password"  className='examplgmailcom wrapper' placeholder=" Create Password" name="password" value={formData.password} required>
                  </input>
                </div>
              </div>
            </div>
            <div className="input-field1">
              <div className="text-and-supporting-text">
                <div className="text-and-supporting-text">
                  <div className="label1">
                    <div className="email"> Re-enter Password</div>
                  </div>
                  <input onChange={handleChange} type="password"  className='examplgmailcom wrapper' placeholder=" Re-enter Password" name="password2" value={formData.password2} required>
                  </input>
                </div>
              </div>
            </div>
          </div>
          <div className="actions">
            
            <button className='examplgmailcom sign-in-wrapper' onClick={submit}>Sign Up</button>
            
            <div className="line-parent">
              <div className="frame-child" />
              <div className="email">OR</div>
              <div className="frame-child" />
            </div>
          </div>
        </div>
        <div className="row1">
          <div className="text3">already have account?</div>
          <div className="button1">
            <div className="button-base">
            <button className='email' onClick={signin}>Sign in</button>
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
               <button className='sign-up-wrapper' onClick={submit} >Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Signup;