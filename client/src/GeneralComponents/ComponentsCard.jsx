import React from 'react'


const ComponentCard = function({componentElement }) {

    return (
        <>
            <div className="card my-2" style={{width: "18rem"}}>
                <img src={componentElement?.img} className="card-img-top" alt={`componentElement?.name`} />
                <div className="card-body mx-auto">
                    <h5 className="card-title mx-auto">{componentElement?.name}</h5>
                    <a href={`components/${componentElement?._id}`} className="btn btn-primary">View Component</a>
                    </div>
            </div>
        </>
    )
}

export default ComponentCard;