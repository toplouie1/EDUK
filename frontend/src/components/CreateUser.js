import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import "../css/CreateUser.css";
import Error from "./Error";

const API = process.env.REACT_APP_API_URL;

function CreateUser() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    user_name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const addUser = () => {
    setError("");
    axios
      .post(`${API}/auth/sign_up`, user)
      .then(() => {
        navigate(`/users/login`);
      })
      .catch((c) => {
        if (c.response) setError(c.response.data.error);
      });
  };

  const handleTextChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div>
      {error ? <Error error={error} /> : ""}
      <form className="create-user-form" onSubmit={handleSubmit}>
         <div className="subtitle">Let's create your account!</div>
         <div>
           <div className="title">Welcome to EDUK!</div>
          Already signed Up? <Link to="/users/login">Login Here</Link>

        </div>
  
          <label htmlFor="first_name" >
            First name
          </label>
          <input
            id="first_name"
            className="input"
            type="text"
            value={user.first_name}
            onChange={handleTextChange}
          />

     

 
          <label htmlFor="lastname" >
            Last name
          </label>
          <input
            id="last_name"
            className="input"
            type="text"
            onChange={handleTextChange}
            value={user.last_name}
            />
          <label htmlFor="age" >
            Age
          </label>
          <input
            id="age"
            className="input"
            type="number"
            onChange={handleTextChange}
            value={user.age}
          />
          <label htmlFor="username" >
            User name
          </label>
          <input
            id="user_name"
            className="input"
            type="text"
            onChange={handleTextChange}
            value={user.user_name}
          />
          <label htmlFor="password" >
            Password
          </label>
          <input
            id="password"
            className="input"
            type="text"
            onChange={handleTextChange}
            value={user.password}
          />
          <label htmlFor="email" >
            Email
          </label>
          <input
            id="email"
            className="input"
            type="text"
            onChange={handleTextChange}
            value={user.email}
          />
        <button type="text" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
