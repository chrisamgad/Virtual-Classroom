import React from "react";
import MainNavigation from './components/MainNavigation/MainNavigation'
import {Switch,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import OurStory from './pages/OurStory/OurStory'
import ContactUs from './pages/ContactUs/ContactUs'

import './App.css';
function App() {
  return (
    <div>
      <MainNavigation/>
      <Switch>
          <Route path="/ourstory">
            <OurStory />
          </Route>
          <Route path="/contactus">
            <ContactUs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
