import React, { useState, useEffect } from 'react'
import Axios from 'axios';

import { toast } from "react-toastify";
import { StyledAuth } from "./Signup";
// import { Router, Link, Route, Redirect } from 'react-router-dom'
import useInput from "../hooks/useInput";

const Login = ({ setAuth }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [authErr, setAuthErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (!email.value.trim() || !password.value.trim()) {
    // }else
     if (!email && !password) {
      setEmailErr('email is invalid!')
      setPassErr('Password is invalid!');
      setAuthErr('');
      return toast.error("Please fill in all the fields");

    } else if (email && !password) {
      setEmailErr('');
      setPassErr('Password is invalid');
      setAuthErr('');
    } else if (!email && password) {
      setPassErr('');
      setEmailErr('email is invalid!');
      setAuthErr('');
    } else if (password.length < 6) {
      setPassErr('Password must containt at least 6 characters!')
      setAuthErr('');
      setEmailErr('');
    } else if (email.length < 5) {
      setEmailErr('email must containt at least 5 characters!')
      setAuthErr('');
      setPassErr('');
    } else if (email.length < 5 && password.length < 6) {
      setEmailErr('email must containt at least 5 characters!')
      setPassErr('Password must containt at least 6 characters!')
      setAuthErr('');
    } else {
      try {
        await Axios.post("http://localhost:8000/api/login", {
          email: email,
          password: password,

        }).then((response) => {
          setAuthErr(response.data.error + " email or Password");
          setEmailErr("");
          setPassErr("");
          setToken(response.data.access_token)
          {
            response.data &&
              response.data.access_token &&
              localStorage.setItem("token", response.data.access_token);
              window.location.reload(true);
              // console.log(localStorage.getItem('token'))
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("userName", response.data.user.userName);
            localStorage.setItem("avatar", response.data.user.avatar);
            localStorage.setItem("cover", response.data.user.cover);
            localStorage.setItem("channelDescription", response.data.user.channelDescription);

          }
        });
      } catch (err) { console.log(err) };


    };
  }

    // dispatch(login({ payload, clearForm }));


  return (
    <StyledAuth>
      <h2>Login to your account</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <div className="action input-group">
          <span className="pointer" onClick={() => setAuth("SIGNUP")}>
            Signup instead
          </span>
          <button>Login</button>
          {/* {token ? <Redirect to="/home"/> : <Redirect to="/"/> } */}
        </div>
      </form>
    </StyledAuth>
  );
};

export default Login;