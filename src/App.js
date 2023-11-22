// import './App.css'
import './App.css';
import Homepage from "./components/homepage.js"
import Home from "./components/userhome"
import Login from "./components/userlogin"
import Signup from "./components/usersignup"
import Booking from "./components/userbooking"
import Profile from "./components/userprofile"
import Ohome from "./components/orghome"
import Ologin from "./components/orglogin"
import Osignup from "./components/orgsignup"
import Onewevent from "./components/orgnewevent"
import Obooking from "./components/orgbooking"
import Oprofile from "./components/orgprofile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/userlogin" element={<Login/>}/>
          <Route path="/usersignup" element={<Signup/>}/>
          <Route path="/userhome" element={<Home/>}/>
          <Route path="/userbooking" element={<Booking/>}/>
          <Route path="/userprofile" element={<Profile/>}/>
          <Route path="/orglogin" element={<Ologin/>}/>
          <Route path="/orgsignup" element={<Osignup/>}/>
          <Route path="/orghome" element={<Ohome/>}/>
          <Route path="/orgnewevent" element={<Onewevent/>}/>
          <Route path="/orgbooking" element={<Obooking/>}/>
          <Route path="/orgprofile" element={<Oprofile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;