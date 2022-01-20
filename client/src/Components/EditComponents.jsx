import { React, useContext, useState, useEffect } from "react";
import { NavLink, useParams, useNavigate, Navigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { DataContext } from "../App";
import axios from "axios";

function EditComponents() {
    const { user } = useContext(DataContext);
    const params = useParams();
    const URL = `/api/components/${params.id}`;
    let navigate = useNavigate();

    // initialize state
  const [currentData, setCurrentData] = useState({
    name: "",
    description: "",
    img: "",
    rating: "",

  });

  useEffect(() => {
    const fetchCurrentData = async () => {
      const res = await axios.get(URL);
      setCurrentData(res.data);
    };
    fetchCurrentData();
  }, []);

  // axios request to UPDATE the current component DATA
  const updateCurrentData = async (info) => {

    try {
        const response = await axios.put(URL, info);
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
    name: yup.string("Enter Component Name")
        .required("Component's name is required"),
    description: yup.string("Enter Component Description")
        .required("Component's Description is required"),
    img: yup
      .string("Enter display picture")
      .required("Display picture is required"),
    rating: yup
      .string("Enter Rating")
      .required("Please enter components rating. i.e. 24VDC"),
  });

  const formik = useFormik({
    // this enables the initialvalues to be loaded with pre-defined values
    enableReinitialize: true,
    initialValues: {
      name: currentData?.name,
      description: currentData?.description,
      img: currentData?.img,
      rating: currentData?.rating,
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateCurrentData(values);
      navigate(`/components/${currentData?._id}`);

    },
  });

  if (!!user?._id === false) {
          
    return <Navigate to="/login" />;
  
}
  else {
    return (
      <div className="project-edit-div">
        <div className="container-sm mx-auto mb-3">
              <NavLink to={`/components/${currentData?._id}`} >
                  <button type="button" className="btn btn-success mx-2 my-3">Return to Component Details</button>
              </NavLink>
          </div>
        <div className="container-sm alert alert-secondary">
        <form onSubmit={formik.handleSubmit}>
          <div className ="mb-3">
            <label htmlFor="name" className="form-label">Component's Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={formik.values.name} onChange={formik.handleChange}/>
              {formik.touched.name && formik.errors.name ? <p className="text-danger"> {formik.errors.name} </p> : null}
                       
            <div id="title" className="form-text">Component's Name</div>
          </div>
  
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Component's Description</label>
            <input type="text" className="form-control" id="description" aria-describedby="emailHelp" value={formik.values.description}
                      onChange={formik.handleChange}
                       />
            {formik.touched.description && formik.errors.description ? <p className="text-danger"> {formik.errors.description} </p> : null}           
            <div id="img" className="form-text">Component's Description</div>
          </div>
  
          <div className="mb-3">
            <label htmlFor="img" className="form-label">Project's img</label>
            <textarea type="message" cols="50" rows="3" className="form-control" id="img" aria-describedby="emailHelp" value={formik.values.img}
                      onChange={formik.handleChange}
                       />
            {formik.touched.img && formik.errors.img ? <p className="text-danger"> {formik.errors.img} </p> : null}
            <div id="briefing" className="form-text">Component's Image</div>
          </div>
  
  
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Component's rating</label>
            <textarea type="message" cols="50" rows="5" className="form-control" id="rating" aria-describedby="emailHelp" value={formik.values.rating}
                      onChange={formik.handleChange}
                       />
            {formik.touched.rating && formik.errors.rating ? <p className="text-danger"> {formik.errors.rating} </p> : null}
            <div id="description" className="form-text">Components Rating i.e 24VDC, 5W</div>
          </div>
  
          <button type="submit" className="btn btn-primary">Edit Component</button>
        </form>
        </div>
      </div>
    )
  }
}



export default EditComponents



