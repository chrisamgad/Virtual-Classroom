import React, { useEffect,useContext } from "react";
import MainNavigation from './components/MainNavigation/MainNavigation'
import {Switch,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import OurStory from './pages/OurStory/OurStory'
import ContactUs from './pages/ContactUs/ContactUs'
import Login from './pages/Login/Login'
import SignUp from "./pages/SignUp/SignUp";
import Profile from './pages/Profile/Profile'
import SetAvatar from "./pages/SetAvatar/SetAvatar";
import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import MyCourses from "./components/MyCourses/MyCourses";
import AuthenticatedContext from './Contexts/AuthenticatedContext'

function App() {

  const authenticateduserCtx= useContext(AuthenticatedContext)
  useEffect(()=>{
    const SetsAuthenticatedUserstate= authenticateduserCtx.SetAuthenticatedUser()
  },[])
 
  return (
    <div>
        <MainNavigation/>
        <Switch>
        <Route path="/" exact>
              <Home />
            </Route> 
            <Route path="/ourstory">
              <OurStory />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/createaccount">
              <SignUp />
            </Route>
            <Route path="/myprofile">
              <Profile />
            </Route>
            <Route path="/setavatar">
              <SetAvatar />
            </Route>
            <Route path="/dashboard" >
              <Dashboard />
            </Route>
          </Switch>
        
    </div>
  );
}

export default App;
