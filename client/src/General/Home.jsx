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
                    <p>Electrical Engineers, Electrical Enthusiasts, and Students, Unite!</p>
                </blockquote>
            </figure>
        </div>
        <div className="container-sm alert alert-primary mx-auto my-3">
            <p className="text-center">
                Engineers are always in search of projects, and building meaningful 
                projects that contributes to society in a meaningful way is always a 
                pleasure thing to do!
                As we know, electrical projects are useful in many fields, as they can,
                and always provide convenience to our daily lifes.   
            </p>
            <p className="text-center">
                As we do know, electrical/electronics projects
                need more power when compared with projects from other fields, in addition,
                there is a safety hazard when dealing with electricity.
                
            </p>
            <p className="text-center">
                With this app designed for engineers, students and enthusiasts to share their
                knowledge, and also, relieve their doubts in electrical/electronics field,   
                We can help each other grow our knowledge based on components and projects shared,
                and also, be mindful of dangerous pitfalls which may cause health hazard
                in this app.
            </p>
            <p className="text-center"> 
                 Please feel free to share electrical/electronics projects with the community, 
                 in areas such as power generation, power system equipment 
                 maintenance and handling, industrial control and robotics, 
                 power electronics, and energy systems.
            </p>


        </div>
        <div className="container-sm alert alert-info border border-warning rounded border border-1 mx-auto">
            <div className="row mx-auto">
                <div className="col mx-auto border border-dark">
                    <blockquote className="blockquote">
                        <p className="text-center">Are you a electrical/electronics student looking for some guides to get started,
                            or an electrical/eletronics engineer trying to get an idea for a project? 
                            Take a look at some community posted projects! 
                        </p>
                        <div className="col mx-auto text-center">
                            <i className="bi bi-lightning-fill mx-auto"></i>
                        </div>
                        <div className="col mx-auto text-center">
                            <NavLink to="/projects">
                                <button type="button" className="btn btn-success mx-auto">View Community Projects</button>
                            </NavLink>
                        </div>
                        
                    </blockquote>
                </div>
                <div className="col mx-auto border border-dark">
                    <blockquote className="blockquote">
                        <p className="text-center">Have some electrical/electronic components you came 
                            across but not very certain regarding their purpose? Come inside
                            the community posted components page and fill your hunger
                            for knowledge regarding these components!
                        </p>
                        <div className="col mx-auto text-center">
                            <i className="bi bi-lightning-fill "></i>
                        </div>
                        <div className="col mx-auto text-center">
                            <NavLink to={"/components"}>
                                <button type="button" className="btn btn-success mx-auto">View Components Details</button>
                            </NavLink>
                        </div>
                        
                    </blockquote>
                </div>
            </div>
            
        </div>
        </>
        
    )
}

export default Home;