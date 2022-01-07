import React, {useState, useContext} from 'react'
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../App";
import { Nav, Navbar } from 'react-bootstrap'
import './GeneralCss/General.css'



const Navigationbar = function(props) {

  const URL = "/api/users/logout";
  let navigate = useNavigate();
  const { user, setUser } = useContext(DataContext);

  const handleLogout = async () => {
      try {
        const response = await axios.get(URL);
        // Success 🎉
        const data = response.data;
        console.log("this is what we get from server: ", data);
        setUser({});
        navigate("/");
    } catch (error) {
        // Error 😨
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            alert("Error in request");
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

    const loggedInButtons = [
      <>
        <NavLink to={`/users/${user._id}`} >
        <button type="button" className="btn btn-warning mx-2">My Account</button>
        </NavLink>
        <button type="button" className="btn btn-danger mx-2" onClick={handleLogout}>Log Out</button>
      </>,
    ];  

    const loggedOutButtons = [
      <>
        <NavLink to={`/register`} >
        <button type="button" className="btn btn-success mx-2">Register</button>
        </NavLink>
        <NavLink to={`/login`} >
        <button type="button" className="btn btn-success mx-2">Log In</button>
        </NavLink>
      </>,
    ]; 
        

    return (
      
        <Navbar bg="info" expand="md">
        <Navbar.Brand href="/">DIY Electricals</Navbar.Brand>    
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/components">Components</Nav.Link>
          </Nav>
          {!!user?._id ? <span className="navbar-brand fw-bold fst-italic mx-2">Welcome {user?.display_name}</span> : null}
          <span className="navbar-text">
          {!!user?._id === false ? 
            loggedOutButtons : 
            loggedInButtons}
          </span>
          
        </Navbar.Collapse>
      
    </Navbar>
      
        
    )
}

export default Navigationbar