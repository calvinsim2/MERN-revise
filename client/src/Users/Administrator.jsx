import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";
import UserCard from '../GeneralComponents/UserCard'
import './UsersCss/Users.css'

function Administrator() {


    const adminURL = '/api/users'
    const { user } = useContext(DataContext)
    const [ allUsers, setAllUsers ] = useState([]) 
    const [status, setStatus] = useState("pending")

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(adminURL);
      console.log(res.data);
      setAllUsers(res.data);
      setStatus("resolved")
      
    };
    fetchUsers();
  }, []);

  const listUsers = allUsers.map((element,index) => {
    
    return (
      <>
        <UserCard
          userElement={element}
          key={`user${index}`}/>
      </>
        
    )
  })

  return (
    <div className="allusers-div">
        <div className="container-sm alert alert-success all-users">
            {status === "resolved" ? listUsers : "Loading... Please wait"}
        </div>
    </div>
    
  )
}

export default Administrator;