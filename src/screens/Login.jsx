import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link , useNavigate  } from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })

    const json = await response.json()
    console.log(json)
    if (!json.success)
      alert("Enter valid credentials")
    else
    {
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate('/')
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div><Navbar /></div>
      <div>
        <>
          <div className='container form'>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" value={credentials.email} name='email' className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} autoFocus='on'></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={credentials.password} name='password' className="form-control" placeholder="Password" onChange={onChange}></input>
              </div>
              <button type="submit" className="m-3 btn btn-warning">Login</button>
              <Link to="/signup" className='m-3 btn btn-dark'>Don't have an account?</Link>
            </form>
          </div>
        </>
      </div>
      <div><Footer /></div>
    </div>
  )
}
