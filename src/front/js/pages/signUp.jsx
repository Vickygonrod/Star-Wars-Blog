import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const handleReset = () => {
    setEmail('');
    setPassword1('');
    setPassword2('');
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password1 == password2) {
      const dataToSend = {
        email: email,
        password: password1,
        is_active: true,
        first_name: "",
        last_name: "",
      };
      const url = `${process.env.BACKEND_URL}/api/signup`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      };
      const response = await fetch(url, options)
      console.log(response)
      if (!response.ok) {
        console.log('Error: ', response.status, response.statusText)
        return
      }
      const data = await response.json()
      console.log(data);
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.data))
      actions.logedIn(data)
      handleReset()
      navigate('/')
    } else {
      setPassword1('');
      setPassword2('')
    }
  };



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">
                Sign Up
              </h2>
              <form onSubmit={handleSignup}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="12345678"
                    value={password1}
                    onChange={handlePassword1Change}
                    required
                  />
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">
                    Repeat your password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="12345678"
                    value={password2}
                    onChange={handlePassword2Change}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-5">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;