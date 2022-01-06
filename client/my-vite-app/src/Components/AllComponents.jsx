import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
import ComponentCard from '../GeneralComponents/ComponentsCard'
import axios from "axios";
import './ComponentsCss/Components.css'


function AllTheComponents() {

  const userURL = `/api/components`;
  const {user} = useContext(DataContext);
  const [allComponents, setAllComponents] = useState([])
  const [status, setStatus] = useState("pending")

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(userURL);
      console.log(res.data);
      setAllComponents(res.data);
      setStatus("resolved")
      
    };
    fetchUser();
  }, []);

  const listComponents = allComponents.map((element,index) => {
    return (
        <>
          <ComponentCard 
            componentElement={element}
            key={index}
          />
        </>
        
    )
  })

  return (
    <div className="allcomponent-div">
      <div className="container-sm mx-auto my-3">
        {!!user?._id ? <NavLink to={`/components/new`} >
        <button type="button" className="btn btn-success mx-2">Add New Component</button>
      </NavLink> : null}
      </div>

      <div className="container-sm alert alert-secondary all-Components">
        {status === "resolved" ? listComponents : "Loading... Please wait"}
      </div>
    </div>
    
  )
}

export default AllTheComponents