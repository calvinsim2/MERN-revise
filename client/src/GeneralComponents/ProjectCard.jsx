import React from 'react'
import { NavLink } from "react-router-dom";


const ProjectCard = function({projectElement }) {

    return (
        <>
            <div className="card my-2" style={{width: "18rem"}}>
                <img src={projectElement?.img} className="card-img-top" alt={`projectElement?.title`} />
                <div className="card-body mx-auto">
                    <h5 className="card-title mx-auto">{projectElement?.title}</h5>
                    <p className="card-text mx-auto">{projectElement?.briefing}</p>
                    <NavLink to={`/projects/${projectElement?._id}`} >
                        <button type="button" className="btn btn-primary mx-2">View Project</button>
                    </NavLink>
                    </div>
            </div>
        </>
    )
}

export default ProjectCard;