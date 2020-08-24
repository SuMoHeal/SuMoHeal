import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () =>{
  const {state,dispatch} = useContext(UserContext)
  const renderList = ()=>{
    if(state){
     return [
      <li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/create">Create Post</Link></li>
     ]
    }else{
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return( 
      <nav>
  <div className="nav-wrapper #0d47a1 blue darken-4" >
          <Link to={state?"/":"/login"} className="brand-logo left">SuMoHeale</Link> 
          <ul id="nav-mobile" className="right">
           {renderList()}
          </ul>
        </div>
  </nav>
      
    )
}

export default NavBar 