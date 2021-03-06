import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from "react-router"
import { createContext } from "react";
import axios from "axios";
import './App.css'
import NavigationBar from './General/NavigationBar'
import Home from './General/Home'
import About from './General/About'
import Footer from './General/Footer'
import AllTheProjects from './Projects/AllProjects'
import NewProjects from './Projects/NewProjects';
import EditProjects from './Projects/EditProjects';
import IndividualProject from './Projects/IndividualProject'
import AllTheComponents from './Components/AllComponents'
import IndividualComponent from './Components/IndividualComponent'
import NewComponents from './Components/NewComponents';
import EditComponents from './Components/EditComponents';
import Administrator from './Users/Administrator';
import Login from './Users/Login'
import Register from './Users/Register';
import UserPage from './Users/IndividualUser';
import UserEdit from './Users/UserEdit';
import './General/GeneralCss/General.css'



export let DataContext = createContext();

function App() {

  const URL = '/api/users/authenticated'
  const [user, setUser] = useState({});
  console.log("PAGE RELOADED!");
  console.log("This is user: ", user);

  useEffect( () => {
    let checkPersistence = async () => {
        
          let response = await axios.get(URL);
          console.log("this is status: ", response.status)
          // Success 🎉
          // passport automatically returns 401 status if not authenticated.
          if (response.status !== 401) {
            let data = response.data;
            console.log("persistence: ", data);
            setUser(data)
        }
        else {
            console.log("no one is logged in")
            setUser({})
        }
      }
      checkPersistence();
  
  }, [])
  
  return (
    <>
      <DataContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <NavigationBar />
        <div className="gen-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Administrator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<AllTheProjects />} />
          <Route path="/projects/new" element={<NewProjects />} />
          <Route path="/projects/edit/:id" element={<EditProjects />} />
          <Route path="/projects/:id" element={<IndividualProject />} />
          <Route path="/components" element={<AllTheComponents />} />
          <Route path="/components/new" element={<NewComponents />} />
          <Route path="/components/edit/:id" element={<EditComponents />} />
          <Route path="/components/:id" element={<IndividualComponent />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </DataContext.Provider>
    </>
  )
}

export default App
