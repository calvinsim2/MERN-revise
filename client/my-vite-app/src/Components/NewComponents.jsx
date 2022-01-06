import { React, useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { DataContext } from "../App";
import axios from "axios";


function NewComponents() {

    const { user } = useContext(DataContext);
    const URL = `/api/components/`;
    let navigate = useNavigate();

      // initialize state
  const [currentData, setCurrentData] = useState({
    name: "",
    description: "",
    img: "",
    rating: "",
  });


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
        name: yup.string("Enter component Name").required("Component name is required"),
        description: yup
          .string("Enter Component's Description")
          .required("Please Elaborate about this added component"),
        img: yup
          .string("Enter component picture")
          .required("Component's picture is required"),
        rating: yup
          .string("Enter Component Rating")
          .required("Is there no rating description for this component?"),  
      });
    
      const formik = useFormik({
        
        initialValues: {
          name: "",
          description: "",
          img: "",
          rating: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          updateCurrentData(values);
          navigate(`/components`);
    
        },
      });

      if (!!user?._id === false) {
          
            return <Navigate to="/login" />;
          
      }
      else {
        return (
            <div className="component-new-div">
                <div className="container-sm mx-auto my-3">
                    <NavLink to={`/components`} >
                        <button type="button" className="btn btn-success mx-2">Return to Component Page</button>
                    </NavLink>
                </div>
            
            <div className="container-sm alert alert-secondary">
            <form onSubmit={formik.handleSubmit}>
                
                    <div class="mb-3">
                        <label htmlFor="name" className="col-form-label">Component Name</label>
                        <input type="text" id="name" name="name" className="form-control" value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name && Boolean(formik.errors.name)
                            }
                            helperText={formik.touched.name && formik.errors.name} />
                    </div>
            
                    <div class="mb-3">
                        <label htmlFor="description" className="col-form-label">Component's Description</label>
                        <input type="text" id="description" name="description" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.description}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.description && Boolean(formik.errors.description)
                            }
                            helperText={formik.touched.description && formik.errors.description} />
                    </div>
                
                    <div class="mb-3">
                        <label htmlFor="img" className="col-form-label">Component's Image</label>
                        <input type="text" id="img" name="img" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.img}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.img && Boolean(formik.errors.img)
                            }
                            helperText={formik.touched.img && formik.errors.img}/>
                    </div>
                
                    <div class="mb-3">
                        <label htmlFor="rating" className="col-form-label">Component's Rating</label>
                        <input type="text" id="rating" name="rating" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.rating}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.rating && Boolean(formik.errors.rating)
                            }
                            helperText={formik.touched.rating && formik.errors.rating}/>
                    </div>
    
                <button type="submit" className="btn btn-primary">Create Component</button>
        </form>
            </div>
            
        </div>
          )
      }
}

export default NewComponents