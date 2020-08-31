import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
         M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
         return
        }
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Welcome to SuMoHeal",classes:"#4caf50 green"})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
      <div className="mycard">
      <div className="card auth-card input-field">
      <h2>SuMoHeal</h2>
      <div className="input-field col s6">
          <i className="material-icons prefix">mail_outline</i>
          <input  type="text" placeholder="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">lock_outline</i>
          <input  type="password" placeholder="Password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
      <button className="btn waves-effect waves-light #0d47a1 blue darken-4"
      onClick={()=>PostData()}
      >
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