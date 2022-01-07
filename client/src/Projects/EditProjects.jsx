import { React, useContext, useState, useEffect } from "react";
import { NavLink, useParams, useNavigate, Navigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { DataContext } from "../App";
import axios from "axios";

function EditProjects() {

    const { user } = useContext(DataContext);
    const params = useParams();
    const getURL = `/api/projects/edit/${params.id}`;
    const putURL = `/api/projects/${params.id}`;
    let navigate = useNavigate();

    // initialize state
  const [currentData, setCurrentData] = useState({
    title: "",
    img: "",
    briefing: "",
    goal: [],
    description: "",
    components: [],
    posted_by: "",
  });

  useEffect(() => {
    const fetchCurrentData = async () => {
      const res = await axios.get(getURL);
      setCurrentData(res.data);
    };
    fetchCurrentData();
  }, []);

  // axios request to UPDATE the current USER DATA
  const updateCurrentData = async (info) => {

    try {
        const response = await axios.put(putURL, info);
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
    title: yup.string("Enter Title").required("Title is required"),
    img: yup
      .string("Enter display picture")
      .required("Display picture is required"),
    briefing: yup
      .string("Enter Briefing")
      .required("Briefing is required"),
    goal: yup
      .string("Enter Project aim")
      .required("Project's Aims are required"),
    description: yup
      .string("Enter Project Description")
      .required("Project's Steps are required"),
    components: yup
      .string("Enter Project Components")
      .required("Components needed for project must be stated"),
  });

  const formik = useFormik({
    // this enables the initialvalues to be loaded with pre-defined values
    enableReinitialize: true,
    initialValues: {
      title: currentData?.title,
      img: currentData?.img,
      briefing: currentData?.briefing,
      goal: currentData?.goal[0],
      description: currentData?.description,
      components: currentData?.components[0],
      posted_by: currentData?.posted_by,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateCurrentData(values);
      navigate(`/projects/${currentData?._id}`);

    },
  });

  if (!!user?._id === false) {
          
    return <Navigate to="/login" />;
  
}
  else {
    return (
      <div className="project-edit-div">
        <div className="container-sm mx-auto my-3">
              <NavLink to={`/projects/${currentData?._id}`} >
                  <button type="button" className="btn btn-success mx-2">Return to Projects Details</button>
              </NavLink>
          </div>
        <div className="container-sm alert alert-primary">
        <form onSubmit={formik.handleSubmit}>
          <div class="mb-3">
            <label for="title" className="form-label">Project Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                          formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title} />
            <div id="title" className="form-text">Your project title name</div>
          </div>
  
          <div className="mb-3">
            <label for="img" className="form-label">Project's Image'</label>
            <input type="text" className="form-control" id="img" aria-describedby="emailHelp" value={formik.values.img}
                      onChange={formik.handleChange}
                      error={
                          formik.touched.img && Boolean(formik.errors.img)
                      }
                      helperText={formik.touched.img && formik.errors.img} />
            <div id="title" class="form-text">Your project's image</div>
          </div>
  
          <div className="mb-3">
            <label for="briefing" class="form-label">Project's Briefing</label>
            <textarea type="message" cols="50" rows="3" class="form-control" id="briefing" aria-describedby="emailHelp" value={formik.values.briefing}
                      onChange={formik.handleChange}
                      error={
                          formik.touched.briefing && Boolean(formik.errors.briefing)
                      }
                      helperText={formik.touched.briefing && formik.errors.briefing} />
            <div id="title" class="form-text">Your project's briefing</div>
          </div>
  
          <div class="mb-3">
            <label for="goal" className="form-label">Project's Goal</label>
            <input type="text" className="form-control" id="goal" aria-describedby="emailHelp" value={formik.values.goal}
                      onChange={formik.handleChange}
                      error={
                          formik.touched.goal && Boolean(formik.errors.goal)
                      }
                      helperText={formik.touched.goal && formik.errors.goal} />
            <div id="title" className="form-text">Main aim for doing this project</div>
            <div id="title" className="form-text">Please use commas ',' to separate points</div>
            <div id="title" className="form-text">e.g. Understand ohms law , Understand circuits.</div>
          </div>
  
          <div className="mb-3">
            <label for="description" className="form-label">Project's Description</label>
            <textarea type="message" cols="50" rows="5" className="form-control" id="description" aria-describedby="emailHelp" value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                          formik.touched.description && Boolean(formik.errors.description)
                      }
                      helperText={formik.touched.description && formik.errors.description} />
            <div id="title" className="form-text">Steps for project.</div>
          </div>
  
          <div className="mb-3">
            <label for="components" className="form-label">Project required Components</label>
            <input type="text" className="form-control" id="components" aria-describedby="emailHelp" value={formik.values.components}
                      onChange={formik.handleChange}
                      error={
                          formik.touched.components && Boolean(formik.errors.components)
                      }
                      helperText={formik.touched.components && formik.errors.components} />
            <div id="title" className="form-text">Components required for project</div>
            <div id="title" className="form-text">Please use commas ',' to separate points</div>
            <div id="title" className="form-text">e.g. Resistor , Inductors</div>
          </div>
  
          <button type="submit" className="btn btn-primary">Edit Projects</button>
        </form>
        </div>
      </div>
    )
  }
    
}

export default EditProjects