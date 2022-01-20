import React from 'react'
import { NavLink } from "react-router-dom";


const UserCard = function({userElement}) {

    const isAdmin = [
        <>
            <h5 className="card-title mx-auto text-primary">{userElement?.username}</h5>
            <p className="card-text mx-auto text-primary">{userElement?.display_name}</p>
        </>
        
    ]

    const isNotAdmin = [
        <>
            <h5 className="card-title mx-auto ">{userElement?.username}</h5>
            <p className="card-text mx-auto ">{userElement?.display_name}</p>
        </>
        
    ]



    return (
        <>
            <div className="card my-2" style={{width: "18rem"}}>
                <img src={userElement?.img} className="card-img-top" alt={`userElement?.username`} />
                <div className= "card-body mx-auto">
                    {!!userElement.is_admin ? isAdmin : isNotAdmin}
                    <NavLink to={`/users/${userElement?._id}`} >
                        <button type="button" className="btn btn-primary mx-2">View User</button>
                    </NavLink>
                    </div>
            </div>
        </>
    )
}

export default UserCard;