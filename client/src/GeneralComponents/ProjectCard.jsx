import React from 'react'
import { NavLink } from "react-router-dom";


const ProjectCard = function({projectElement }) {

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <img src={projectElement?.img} className="card-img-top" alt={`projectElement?.title`} />
                <div className="card-body">
                    <h5 className="card-title">{projectElement?.title}</h5>
                    <p className="card-text">{projectElement?.briefing}</p>
                    <NavLink to={`/projects/${projectElement?._id}`} >
                        <button type="button" className="btn btn-primary mx-2">View Project</button>
                    </NavLink>
                    </div>
            </div>
        </>
    )
}

export default ProjectCard;