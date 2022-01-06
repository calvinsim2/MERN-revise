import React, { useState, useEffect, useContext } from 'react'
import { useParams, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";

const IndividualProject = function(props) {

    const params = useParams();
    const userURL = `/api/projects/${params?.id}`;
    const { user } = useContext(DataContext);
    const [projectDetails, setProjectDetails] = useState([])
    const [state, setState] = useState("pending")
    let goalDetails;
    let componentDetails;
    let postedUserId;

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(userURL);
          console.log(res.data);
          console.log(res.data.goal)
          setProjectDetails(res.data);
          setState("resolved")
          
        };
        fetchUser();
      }, []);

    if (state === "resolved") {
        goalDetails = projectDetails.goal.map((element, index) => {
            let myKey = index
            return <li key={index} >{element}</li>
    })

        componentDetails = projectDetails.components.map((element, index) => { 
            let myKey2 = index
            return <li key={index}>{element}</li>

    })
    postedUserId = projectDetails?.posted_by?._id
}

    if (!!user?._id === false) {
        return <Navigate to="/login" />;
    }
    else {
        return (
            <div className="project-div">
                <div className="container-sm mx-auto my-3">
                    <NavLink to="/projects">
                    <button type="button" className="btn btn-warning mx-2">Return to Project List</button>
                    </NavLink>
                </div>
                
                <div className="container-sm alert alert-primary mx-auto my-3">
                  <div className="header mx-auto my-3">
                    <h3 className="text-center my-3">{projectDetails.title}</h3>
                    <p className="blockquote-footer text-center my-1">{projectDetails.briefing}</p>
                  </div>
                    
                    <div className="card mx-auto my-3" style={{width: "20rem"}}>
                        <img src={projectDetails?.img} className="card-img-top" alt={projectDetails?.name} />
                        <div className="card-body mx-auto my-3">
                            {user?._id === postedUserId ? 
                                <NavLink to={`/projects/edit/${projectDetails?._id}`} >
                                    <button type="button" className="btn btn-primary mx-2">Edit Project</button>
                                </NavLink> : null}
                        </div>
                    </div>
                    <p className="text-center fw-bold my-3">
                        Posted by : <NavLink to={`/users/${postedUserId}`}>
                                        {projectDetails?.posted_by?.display_name}
                                    </NavLink> ({projectDetails?.posted_by?.occupation})
                    </p>
                </div>
                
                <div className="container-sm alert alert-primary mx-auto my-3">
                <h4>Learning Points:</h4>
                    <ul>
                    {goalDetails}
                    </ul>
                </div>
                
                <div className="container-sm alert alert-primary mx-auto my-3">
                    <h4>Description</h4>
                    <p>{projectDetails.description}</p>   
                </div>
                
                
                <div className="container-sm alert alert-primary mx-auto my-3">
                    <h4>Components Required:</h4>
                    <ul>    
                    {componentDetails}
                    </ul>
                </div>
                
            </div>
            
        )
    }

    
}

export default IndividualProject;

