import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false)
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    };

    const handleReset = () => {
    setEmail('');
    setPassword('');
    };

    const handleViewPassword = () => setViewPassword(!viewPassword)

    const handleSumbit = (event) => {
      event.preventDefault();
      const dataToSend = {
      email: email,
      password: password
       } 
    actions.loginUser(dataToSend)
    handleReset()
    navigate('/')
    };

  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">
                Login
              </h2>
              <form onSubmit={handleSumbit}>
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
                      <input 
                      type={viewPassword ? "text" : "password"} 
                      className="form-control" 
                      id="exampleInputPassword1" 
                      aria-describedby="passwordHelp"
                      value={password} 
                      onChange={handlePasswordChange} />
                        <span className="input-group-text fs-6" onClick={handleViewPassword}>
                        {viewPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                        </span>
                  </div>
                  <div className="text-center">
                      <button type="submit" className="btn btn-primary mt-5">
                        Login
                      </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Login;