import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import "./App.css"

import NavBar from './components/Navbar'

import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'


function App() {
  return (
    <BrowserRouter>

     <NavBar />
     <Route  exact path="/">
       <Home />
     </Route>
     <Route path="/login">
       <Login />
     </Route>
     <Route path="/signup">
       <Signup/>
     </Route>
     <Route path="/profile">
       <Profile />
     </Route>

    </BrowserRouter>
  

  );
}

export default App;
