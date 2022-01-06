import { React, useContext } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { DataContext } from "../App";
import axios from "axios";

function NewProjects() {

    const { user } = useContext(DataContext);
    const URL = `/api/projects/`;
    let navigate = useNavigate();

  // axios request to UPDATE the current USER DATA
  const updateCurrentData = async (info) => {
    
    try {
        const response = await axios.post(URL, info);
        // Success 🎉
        const data = response.data;
        console.log("this is what we get from server: ", data);
    } catch (error) {
        // Error 😨
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            alert("Error in making request");
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

    //==================== FORMIK RELATED ======================
    const validationSchema = yup.object({
        title: yup.string("Enter Project Title").required("Title is required"),
        img: yup
          .string("Enter Project's Image")
          .required("Please insert Project's Image"),
        briefing: yup
          .string("Please elaborate about project")
          .required("Please describe your project"),
        goal: yup
          .string("Enter Goals")
          .required("Main aim of this project?"),  
        description: yup
          .string("Please elaborate the steps for this project")
          .required("Actions involved in this project?"),  
      });
    
      const formik = useFormik({
        
        initialValues: {
            title: "",
            img: "",
            briefing: "",
            goal: "",
            description: "",
            components: "",
            posted_by: user?._id,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          updateCurrentData(values);
          navigate(`/projects`);
    
        },
      });  

    if (!!user?._id === false) {
        return <Navigate to="/login" />
    }
    else {
        return (
            <div className="project-new-div">
                <div className="container-sm mx-auto my-3">
                    <NavLink to={`/projects`} >
                        <button type="button" className="btn btn-success mx-2">Return to Projects Page</button>
                    </NavLink>
                </div>
    
            <div className="container-sm alert alert-primary">
            <form onSubmit={formik.handleSubmit}>
            
                <div class="mb-3">
                    <label htmlFor="title" className="col-form-label">Project Name</label>
                    <input type="text" id="title" name="title" className="form-control" value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title} />
                    <div id="title" class="form-text">Your project title name</div>
                </div>
            
                <div class="mb-3">
                    <label htmlFor="img" className="col-form-label">Project's Image</label>
                    <input type="text" id="img" name="img" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.img}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.img && Boolean(formik.errors.img)
                        }
                        helperText={formik.touched.img && formik.errors.img} />
                    <div id="title" class="form-text">Your project's image</div>
                </div>
            
                <div class="mb-3">
                    <label htmlFor="briefing" className="col-form-label">Overview</label>
                
                    <textarea type="message" cols="50" rows="3" id="briefing" name="briefing" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.briefing}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.briefing && Boolean(formik.errors.briefing)
                        }
                        helperText={formik.touched.briefing && formik.errors.briefing}/>
                    <div id="title" class="form-text">Your project's briefing</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="goal" className="col-form-label">Project's Goal</label>
                    <input type="text" id="goal" name="goal" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.goal}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.goal && Boolean(formik.errors.goal)
                        }
                        helperText={formik.touched.goal && formik.errors.goal}/>
                    <div id="title" class="form-text">Main aim for doing this project</div>
                    <div id="title" class="form-text">Please use commas ',' to separate points</div>
                    <div id="title" class="form-text">e.g. Understand ohms law , Understand circuits.</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="description" className="col-form-label">Project's Steps</label>
                    <textarea type="message" cols="50" rows="5" id="description" name="description" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.description && Boolean(formik.errors.description)
                        }
                        helperText={formik.touched.description && formik.errors.description}/>
                    <div id="title" class="form-text">Steps for project.</div>
                </div>
            
                <div class="mb-3">
                    <label htmlFor="components" className="col-form-label">Components Included in Project</label>
                    <input type="text" id="components" name="components" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.components}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.components && Boolean(formik.errors.components)
                        }
                        helperText={formik.touched.components && formik.errors.components}/>
                    <div id="title" class="form-text">Components required for project</div>
                    <div id="title" class="form-text">Please use commas ',' to separate points</div>
                    <div id="title" class="form-text">e.g. Resistor , Inductors</div>
                </div>
            
    
            <button type="submit" className="btn btn-primary">Share Project</button>
        </form>
            </div>
            
        </div>
          )
      } 
    
      
}

export default NewProjects