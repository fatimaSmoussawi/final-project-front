import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import styled from "styled-components";
import Axios from 'axios';
import useInput from "../hooks/useInput";

export const StyledAuth = styled.div`
  width: 385px;
  padding: 3rem 1.5rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 8% auto;

  h2 {
    margin-bottom: 1.3rem;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input-group input:last-child {
    margin-left: 0.7rem;
  }

  input {
    overflow: hidden;
    border-radius: 3px;
    width: 100%;
    padding: 0.6rem 1.2rem;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.primaryColor};
  }

  .action {
    margin-top: 1rem;
  }

  button {
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.red};
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }

  @media screen and (max-width: 430px) {
    margin: 20% auto;
    width: 90%;
  }
`;

const Signup = ({ setAuth }) => {
  // const dispatch = useDispatch();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [token, setToken] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const link = "http://127.0.0.1:8000/api/register";
      const body = new FormData();
      body.append("firstName", firstName);
      body.append("lastName", lastName);
      body.append("userName", userName);
      body.append("email", email);
      body.append("password", password1);
      await Axios
        .post(link, body, {
          headers: {
            // "content-type": "multipart/form-data",
            // Accept: "application/json",
            'content-type': 'multipart/form-data',
            'Authorization': "Bearer " + localStorage.getItem('token')
          }
        }).then((response) => {
          setToken(response.data.access_token)
          {
            response.data &&
            response.data.access_token &&
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("password", response.data.user.password);
            localStorage.setItem("username", response.data.user.username);
          }

        })

    } catch (error) {
      console.log(error)

    }
  }
  // if (token) return <Redirect exact to="/profile" />


    // if (
    //   !firstname.value.trim() ||
    //   !lastname.value.trim() ||
    //   !username.value.trim() ||
    //   !email.value.trim() ||
    //   !password1.value.trim() ||
    //   !password2.value.trim()
    // ) {
    //   return toast.error("Please fill in all the fields");
    // }

    // if (password1.value !== password2.value) {
    //   return toast.error("Password does not match");
    // }

    // if (username.value.length <= 3) {
    //   return toast.error("Username should be atleast four characters long");
    // }

    // const re = /^[a-z0-9\x20]+$/i;
    // if (!re.exec(username.value)) {
    //   return toast.error("Choose a better username");
    // }

    // const payload = {
    //   username: username.value,
    //   firstname: firstname.value,
    //   lastname: lastname.value,
    //   email: email.value,
    //   password: password1.value,
    // };

    // const clearForm = () => {
    //   username.setValue("");
    //   firstname.setValue("");
    //   lastname.setValue("");
    //   email.setValue("");
    //   password1.setValue("");
    //   password2.setValue("");
    // };

    // dispatch(signup({ payload, clearForm }));

  return (
    <StyledAuth>
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value) }}
          />
          <input
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => { setLastName(e.target.value) }}
          />
        </div>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => { setUserName(e.target.value) }}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <div className="input-group">
          <input
            type="password"
            placeholder="password"
            value={password1}
            onChange={(e) => { setPassword1(e.target.value) }}
          />
          <input
            type="password"
            placeholder="confirm"
            value={password2}
            onChange={(e) => { setPassword2(e.target.value) }}
          />
        </div>
        <div className="action input-group">
          <span className="pointer" onClick={() => setAuth("LOGIN")}>
            Signin instead
          </span>
          <button>Sign Up</button>
        </div>
      </form>
    </StyledAuth>
  );
};

export default Signup;
