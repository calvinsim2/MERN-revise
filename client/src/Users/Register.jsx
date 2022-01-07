import React from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";


function Register() {

    const URL = "/api/users/";

  const { user } = useContext(DataContext);
  const [name, setName] = useState("");
  const [inputpassword, setInputPassword] = useState("");
  const [inputdisplayName, setInputDisplayName] = useState("");
  const [inputOccupation, setInputOccupation] = useState("");
  let navigate = useNavigate();
  

  const typeName = (event) => {
    setName(event.target.value);
    console.log("name is this: ", event.target.value);
  };
  const typePassword = (event) => {
    setInputPassword(event.target.value);
  };
  const typeDisplayName = (event) => {
    setInputDisplayName(event.target.value);
  };

  const typeOccupation = (event) => {
    setInputOccupation(event.target.value);
  };

  const CreateUser = async (event) => {
    event.preventDefault();
    // check if username & password is accidentally an empty value.
    const newUser = {
      username: !!name ? name : null,

      password: !!inputpassword ? inputpassword : null,
      display_name: !!inputdisplayName ? inputdisplayName : null,
      occupation: !!inputOccupation ? inputOccupation : null,
    };

    // if username OR password is null, alert user and prevent signing up!
    if (!newUser.username || !newUser.password) {
      alert("Oops, username and password CANNOT be null!");
    }
    // else, we will proceed to call backend to set up the new user!
    else {
        try {
            const response = await axios.post(URL, newUser);
            // Success 🎉
            const data = response.data;
            console.log("this is what we get from server: ", data);
            navigate("/login");
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
 }
 if (!!user?._id) {
  return <Navigate to="/" />;
 } 
 
 else {
  return (
    <div className="register-page">
       
       <div className="container-sm mx-auto my-3">
        <NavLink to={"/"}>
          <button type="button" className="btn btn-success mx-2">Back to Main Page</button>
        </NavLink>
        <NavLink to={"/login"}>
          <button type="button" className="btn btn-success mx-2">Already a user? Log in here!</button>
        </NavLink>
       </div>
            
      
      <div className="container-sm alert alert-info rounded">
        <h1>Join us today!</h1>
        <form className="register-form" onSubmit={CreateUser}>
          <div className="mb-3">
              <label htmlFor="username" className="form-label">Username :</label>
              <input type="text" id="username" name="username" onChange={typeName} />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password :</label>
              <input type="password"  id="password" name="password" onChange={typePassword}/>
          </div>
          <div className="mb-3">
              <label htmlFor="display_name" className="form-label">Display Name :</label>
              <input type="text" id="display_name" name="display_name" onChange={typeDisplayName} />
          </div>
          <div className="mb-3">
              <label htmlFor="occupation" className="form-label">Occupation :</label>
              <input type="text" id="occupation" name="occupation" onChange={typeOccupation} />
          </div>
          <button type="submit" className="btn btn-primary">Register Account</button>
        </form>
      </div>
  
    </div>
   )
 }
   
}

export default Register