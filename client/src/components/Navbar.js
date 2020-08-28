import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () =>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
     return [
      <li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/create">Create Post</Link></li>,
      <li><Link to="/myfollowingpost">My following Posts</Link></li>,
      
      <button className="btn waves-effect waves-light #dd2c00 deep-orange accent-4"
      onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/login')
      }}
      >
      Logout
      </button>
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