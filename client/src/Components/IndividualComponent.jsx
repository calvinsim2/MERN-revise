import React, { useContext, useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";
import './ComponentsCss/Components.css'

const IndividualComponent = function(props) {

    const { user } = useContext(DataContext);
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
        <div className="container-sm mx-auto mb-3">
          <NavLink to="/components">
          <button type="button" className="btn btn-warning mx-2 my-3">Return to Component List</button>
          </NavLink>
        </div>
        <div className="container-sm alert alert-secondary mx-auto my-3">
            <div className="header mx-auto my-3">
              <h3 className="text-center my-3">{componentDetails?.name}</h3>
            </div>

            <div className="card mx-auto " style={{width: "20rem"}}>
              <img src={componentDetails?.img} className="component" alt={`ComponentDetails?.name`} />
              <div className="card-body mx-auto my-3">
                {!!user._id ? 
                  <NavLink to={`/components/edit/${componentDetails?._id}`} >
                  <button type="button" className="btn btn-secondary mx-2">Edit Component</button>
                </NavLink> : null}     
                                
                </div>
            </div>
        </div>
        
        <div className="container-sm alert alert-secondary mx-auto ">
                <h4>Description</h4>
                <p>{componentDetails?.description}</p>   
                <h4>Typical Component Ratings</h4>
                <p>{componentDetails?.rating}</p>   
        </div>
        
      </div>
      
    )
}

export default IndividualComponent;