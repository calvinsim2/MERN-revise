import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";
import ProjectCard from '../GeneralComponents/ProjectCard';
import './ProjectsCss/Projects.css'


function AllTheProjects() {

  const userURL = `/api/projects`;
  const {user} = useContext(DataContext);
  const [allProjects, setAllProjects] = useState([])
  const [status, setStatus] = useState("pending")

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(userURL);
      console.log(res.data);
      setAllProjects(res.data);
      setStatus("resolved")
      
    };
    fetchUser();
  }, []);

  const listProjects = allProjects.map((element,index) => {
    
    return (
      <>
        <ProjectCard
          projectElement={element}
          key={`project${index}`}/>
      </>
        
    )
  })

  return (
    <div className="allproject-div">
      <div className="container-sm mx-auto">
        {!!user?._id ? <NavLink to={`/projects/new`} >
          <button type="button" className="btn btn-success mx-2 my-3">Add New Project</button>
        </NavLink> : null}
      </div>
    <div className="container-sm alert alert-primary all-projects">
      {status === "resolved" ? listProjects : "Loading... Please wait"}
    </div>
    
    </div>
    
  )
}

export default AllTheProjects