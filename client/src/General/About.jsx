import React, { useContext } from 'react'
import { DataContext } from "../App";

function About() {
  
  const { user } = useContext(DataContext);

  return (
    <div className="About">

      {!!user?._id === false ? null :
       <div className="w-50 p-3 alert alert-primary mx-auto mb-3">
          <h3 className="my-1">Welcome {user?.display_name}</h3>
       </div> 
        }
      <div className="container-sm alert alert-primary mx-auto ">
              <div className="row mx-auto">
                <div className="col mx-auto rounded">
                  <div className="card mx-auto my-2" style={{width: "17rem"}}>
                    <img src="https://imgur.com/R08eJ46.jpg" className="card-img-top" alt="sample project image" />
                  </div>
                </div>
                <div className="col mx-auto rounded">  
                  <div className="card mx-auto my-2" style={{width: "17rem"}}>
                      <img src="https://imgur.com/Qt2mYbg.jpg" className="card-img-top" alt="sample project image" />
                  </div>
                </div>
                <div className="col mx-auto rounded">
                  <div className="card mx-auto my-2" style={{width: "17rem"}}>
                      <img src="https://imgur.com/ODAZbvf.jpg" className="card-img-top" alt="sample project image" />
                  </div>
                </div>
              </div>
              <div className="header mx-auto my-3">
                <h1 className="my-3">About</h1>
                <p className="blockquote-footer my-1">DIY Electricals</p>
              </div>
              <h4 className="my-1">Bored, nothing to do and want to learn some stuff about electical engineering?</h4>
              <h4 className="my-1">This app is right here for you! We have many examples of project and electrical fundamentals
                  for you to learn!
              </h4>
      </div>
    </div>
  )
}

export default About