import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";


function Login() {
  const URL = "/api/users/login";
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { user, setUser } = useContext(DataContext);
  

  const typeUsername = (event) => {
    setName(event.target.value);
  };
  const typePassword = (event) => {
    setInputPassword(event.target.value);
  };

  // log in
  const logIn = async (event) => {
    event.preventDefault();
    // check if username and password inserted is purposely
    // or accidentally left empty by user.
    const loginDetails = {
      username: !!name ? name : null,
      password: !!inputPassword ? inputPassword : null,
    };

    // find user at backend
    try {
      const response = await axios.post(URL, loginDetails);
      // Success 🎉
      const data = response.data;
      console.log("this is what we get from server: ", data);
      setUser(data);
      navigate("/");
  } catch (error) {
      // Error 😨
      if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          alert("Incorrect username or password");
          console.log(error.response.data);
          

      } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
      } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
      }
      console.log(error);
  }
  };


  // RENDER
  if (!!user?._id === true) {
    return <div>{`${user?.username} is logged in!`}</div>;
  }
  return (
    <div className="login-page">
      <h1>这个是 Login Page!</h1>
      <NavLink to={"/"}>
        <p>Back to Main Page</p>
      </NavLink>
      <NavLink to={"/register"}>
        <p>Not a user? Sign up today!</p>
      </NavLink>
      <div className="login">
      <form className="login-form" onSubmit={logIn}>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" name="username" onChange={typeUsername} />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password"  id="password" name="password" onChange={typePassword}/>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
