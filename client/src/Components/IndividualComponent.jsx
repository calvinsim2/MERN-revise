import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import axios from "axios";
import './ComponentsCss/Components.css'

const IndividualComponent = function(props) {

    const params = useParams();
    const componentURL = `/api/components/${params?.id}`;
    const [componentDetails, setComponentDetails] = useState([])
    const [state, setState] = useState("pending")


    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(componentURL);
          setComponentDetails(res.data);
          setState("resolved")
          
        };
        fetchUser();
      }, []);

    
    return (
      <div className="component-div">
        <div className="container-sm mx-auto my-3">
          <NavLink to="/components">
          <button type="button" className="btn btn-warning mx-2">Return to Component List</button>
          </NavLink>
        </div>
        <div className="container-sm alert alert-secondary mx-auto my-3">
            <div className="header mx-auto my-3">
              <h3 className="text-center my-3">{componentDetails?.name}</h3>
            </div>

            <div className="card mx-auto my-3" style={{width: "20rem"}}>
            <img src={componentDetails?.img} className="component" alt={`ComponentDetails?.name`} />
            </div>
        </div>
        
        <div className="container-sm alert alert-secondary mx-auto my-3">
                <h4>Description</h4>
                <p>{componentDetails?.description}</p>   
        </div>
        <div className="container-sm alert alert-secondary mx-auto my-3">
                <h4>Typical Component Ratings</h4>
                <p>{componentDetails?.rating}</p>   
        </div>
      </div>
      
    )
}

export default IndividualComponent;