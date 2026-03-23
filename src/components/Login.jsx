import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import '../css/login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const token = Cookies.get("jwt-token")

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  const [allValues, setValues] = useState({
    username: "",
    password: "",
    errorMsg: ""
  })

  const handleSumbitUserLogin = async (e) => {

    e.preventDefault();

    const api = "https://apis.ccbp.in/login"

    const userDetails = {
      username: allValues.username,
      password: allValues.password
    }

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    }

    try {
      const response = await fetch(api, options)
      const data = await response.json()
      if (response.ok === true) {
        setValues({ ...allValues, errorMsg: "" })
        Cookies.set("jwt-token", data.jwt_token)
        navigate("/");
      } else {
        setValues({ ...allValues, errorMsg: data.error_msg })
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (token) {
    return <></>
  }

  return (
    <>
      <div className="login-main-cont">
        <div className="login-cont">
<<<<<<< HEAD
          <div className="login">
            <h1>Welcome Back</h1>
            <form className='form' onSubmit={handleSumbitUserLogin}>
              <div className='form-group'>
                <label htmlFor="username"><i className="fa-solid fa-user"></i> Username</label>
                <input className='form-control' type="text" id='username' placeholder="Enter rahuls" onChange={(e) => setValues({ ...allValues, username: e.target.value })} />
              </div>
              <div className='form-group'>
                <label htmlFor="password"><i className="fa-solid fa-lock"></i> Password</label>
                <input className='form-control' type="password" id='password' placeholder="Enter rahul@2021" onChange={(e) => setValues({ ...allValues, password: e.target.value })} />
              </div>
              <button type='submit' className="btn-login">Sign In</button>
              {allValues.errorMsg && <p className='text-danger text-center mt-3 fw-bold'>{allValues.errorMsg}</p>}
=======
          <div className="login col-md-4 col-lg-3 col-sm-6">
            <h1 className='text-center fw-bold mb-3'>Login</h1>
            <form className='form' onSubmit={handleSumbitUserLogin}>
              <div className='form-group mb-3'>
                <i className="fa-solid fa-user"></i><label htmlFor="username" className='fw-bold'>Username (rahul)</label>
                <input className='form-control' type="text" id='username' placeholder="Enter Username" onChange={(e) => setValues({ ...allValues, username: e.target.value })} />
              </div>
              <div className='form-group mb-3'>
                <i className="fa-solid fa-lock"></i><label htmlFor="password" className='fw-bold'> Password (rahul@2021)</label>
                <input className='form-control' type="password" id='password' placeholder="Enter Password" onChange={(e) => setValues({ ...allValues, password: e.target.value })} />
              </div>
              <button type='submit' className="btn-login">Login</button>
              <br />
              <p className='text-danger text-center fw-bold'>{allValues.errorMsg}</p>
>>>>>>> 87b7e8a50e4a3eba55dbea518447bff41b837971
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
