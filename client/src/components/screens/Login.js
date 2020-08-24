import React from 'react';
import {Link} from 'react-router-dom'

const Login = ()=>{
   
    return(
      <div className="mycard">
      <div className="card auth-card input-field">
      <h2>SuMoHeal</h2>
      <div class="input-field col s6">
          <i class="material-icons prefix">mail_outline</i>
          <input  type="text" placeholder="email"/>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">lock_outline</i>
          <input  type="text" placeholder="Password"/>
        </div>
      <button className="btn waves-effect waves-light #0d47a1 blue darken-4" >
      Login
      </button>
      <h5>
          <Link to="/signup">Dont have an account?</Link>
      </h5>
</div>
</div>
        
    )
}

export default Login