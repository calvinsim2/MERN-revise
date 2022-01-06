import React from 'react'


const ProjectCard = function({projectElement }) {

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <img src={projectElement?.img} className="card-img-top" alt={`projectElement?.title`} />
                <div className="card-body">
                    <h5 className="card-title">{projectElement?.title}</h5>
                    <p className="card-text">{projectElement?.briefing}</p>
                    <a href={`projects/${projectElement?._id}`} className="btn btn-primary">View Project</a>
                    </div>
            </div>
        </>
    )
}

export default ProjectCard;