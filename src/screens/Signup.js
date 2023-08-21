import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link,useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,
            })
        })

        const json = await response.json()
        if (!json.success)
            alert("Enter valid credentials")
        else
        navigate('/login')
    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div><Navbar /></div>
            <>
                <div className='container form'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={credentials.name} name='name' className="form-control" placeholder="Enter name" onChange={onChange} autoFocus='on'></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" value={credentials.email} name='email' className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}></input>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={credentials.password} name='password' className="form-control" placeholder="Password" onChange={onChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Home Address</label>
                            <input type="text" value={credentials.geolocation} name='geolocation' className="form-control" placeholder="Location" onChange={onChange}></input>
                        </div>
                        <button type="submit" className="m-3 btn btn-warning">SignUp</button>
                        <Link to="/login" className='m-3 btn btn-dark'>Already a user?</Link>
                    </form>
                </div>
            </>
            <div><Footer /></div>
        </div>
    )
}