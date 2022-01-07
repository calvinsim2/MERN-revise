import { React, useContext, useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { DataContext } from "../App";
import axios from "axios";

function UserEdit() {

    const { user } = useContext(DataContext);
    const params = useParams();
    const URL = `/api/users/${params.id}`;
    let navigate = useNavigate();

    // initialize state
  const [currentData, setCurrentData] = useState({
    img: "",
    display_name: "",
    occupation: "",
  });

  useEffect(() => {
    const fetchCurrentData = async () => {
      const res = await axios.get(URL);
      setCurrentData(res.data);
    };
    fetchCurrentData();
  }, []);

  // axios request to UPDATE the current USER DATA
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
    display_name: yup.string("Enter your Name").required("Name is required"),
    img: yup
      .string("Enter display picture")
      .required("Display picture is required"),
  });

  const formik = useFormik({
    // this enables the initialvalues to be loaded with pre-defined values
    enableReinitialize: true,
    initialValues: {
      img: currentData?.img,
      display_name: currentData?.display_name,
      occupation: currentData?.occupation,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateCurrentData(values);
      navigate(`/users/${user?._id}`);

    },
  });
    return (
        <div className="user-edit-div">
            <div className="container-sm mx-auto my-3">
                <div className="add-project mx-auto my-3">
                    <NavLink to={`/users/${user?._id}`} >
                        <button type="button" className="btn btn-success mx-2">Return to User Details</button>
                    </NavLink>
                </div>

            <div className="container-sm alert alert-success">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="img" className="col-form-label">Image URL Link</label>
                    <input type="text" id="img" name="img" className="form-control" value={formik.values.img}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.img && Boolean(formik.errors.img)
                        }
                        helperText={formik.touched.img && formik.errors.img} />
                
                    <span id="passwordHelpInline" className="form-text">
                    Please provide a working url link for your image.
                    </span>
                </div>

            <div className="mb-3">
                    <label htmlFor="display_name" className="col-form-label">Display Name</label>
                    <input type="text" id="display_name" name="display_name" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.display_name}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.display_name && Boolean(formik.errors.display_name)
                        }
                        helperText={formik.touched.display_name && formik.errors.display_name} />
                
                    <span id="passwordHelpInline" className="form-text">
                    Name which other user view you as.
                    </span>
            </div>

            <div className="mb-3">
                    <label htmlFor="occupation" className="col-form-label">Occupation</label>
                    <input type="text" id="occupation" name="occupation" className="form-control" aria-describedby="passwordHelpInline" value={formik.values.occupation}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.occupation && Boolean(formik.errors.occupation)
                        }
                        helperText={formik.touched.occupation && formik.errors.occupation}/>
                
                    <span id="passwordHelpInline" className="form-text">
                    What are you working as currently
                    </span>
            </div>
            <button type="submit" className="btn btn-primary mx-auto">Update Details</button>
            </form>
            </div>
            </div>
            
            
        </div>
        
    )
}

export default UserEdit;