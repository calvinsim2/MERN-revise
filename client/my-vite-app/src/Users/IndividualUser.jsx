import React from "react";
import { NavLink, useParams, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../App";
import axios from "axios";



function UserPage() {

    const params = useParams();
    const { user } = useContext(DataContext);
    const individualUserURL = `/api/users/${params?.id}`;
    const [userDetails, setUserDetails] = useState([])
    const [state, setState] = useState("pending")
    let joinDate;

    useEffect(() => {
        
        const fetchUser = async () => {
            
        try {
            const response = await axios.get(individualUserURL);
            // Success 🎉
            const data = response.data;
            console.log("this is what we get from server: ", data);
            setUserDetails(data);
            setState("resolved")
            
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
        fetchUser();
      }, []);

        if (state === "resolved") {
            joinDate = userDetails?.joined_date.substring(0, 10)
        }

    if (!!user?._id === false) {
          
        return <Navigate to="/login" />;
    }
    else {
        return (
            <div className="user-show-div">
                <div className="container-sm my-3 mx-auto rounded">
                    <NavLink to={`/projects`} >
                        <button type="button" className="btn btn-success mx-2">View Community Projects</button>
                    </NavLink>
                </div>
                <div className="container-sm alert alert-success mx-auto">
                <div className="row mx-auto">
                    <div className="card mx-auto my-2" style={{width: "20rem"}}>
                        <img src={userDetails?.img} className="card-img-top" alt={userDetails?.name} />
                        <div className="card-body mx-auto">
                            {user?._id === userDetails?._id ? <a href={`/users/edit/${userDetails?._id}`} className="btn btn-primary">Edit User</a> : null}
                        </div>
                    </div>
                </div>    
                <div className="row mx-auto my-2 border border-warning rounded border border-2">
                    <div className="col mx-auto border border-warning rounded border border-2">
                        <p className="mx-auto my-2 fw-bold">Name: {userDetails?.display_name}</p>
                    </div>
                    <div className="col mx-auto border border-warning rounded border border-2">
                        <p className="mx-auto my-2 fw-bold">Occupation: {userDetails?.occupation}</p>
                    </div>
                    <div className="col mx-auto border border-warning rounded border border-2">
                        <p className="mx-auto my-2 fw-bold">Joined Date (YYYY-MM-DD): {joinDate}</p>
                    </div>
                    
                </div>
                </div>
            </div>
            
        )
    }
    
}

export default UserPage