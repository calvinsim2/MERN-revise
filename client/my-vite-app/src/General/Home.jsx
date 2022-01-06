import React from 'react'
import { NavLink} from "react-router-dom";
import './Home.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = function(props) {
    return (
        <>
        <div className="container-xl first">
            <h1 className="display-1 text-center">DIY Electricals</h1>
            <figure className="text-center">
                <blockquote className="blockquote">
                    <p>Electrical Engineers and Enthusiasts, Unite!</p>
                </blockquote>
            </figure>
        </div>
        <div className="container-xl second">
            <div className="container-md block1">
                <blockquote className="blockquote">
                    <p>Looking for some guides to get started, but not sure 
                        where? Take a look at some community posted projects 
                        for a start!
                    </p>
                    <i className="bi bi-lightning-fill"></i>
                    <NavLink to="/projects">
                        View Community Projects
                    </NavLink>
                </blockquote>
            </div>
            <div className="container-md block2">
            <blockquote className="blockquote">
                    <p>Have some electrical/electronic components you came 
                        across but not very certain regarding their purpose? Come inside
                        the community posted components page and fill your hunger
                        for knowledge regarding these components!
                    </p>
                    <NavLink to={"/components"}>
                        View Components Details
                    </NavLink>
                </blockquote>
            </div>
            
        </div>
        </>
        
    )
}

export default Home;