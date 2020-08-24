import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
         M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
         return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                phoneNumber
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message,classes:"#4caf50 green"})
                history.push("/login")
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
          <i className="material-icons prefix">person_outline</i>
          <input  type="text" placeholder="name" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
     </div>
     
     <div className="input-field col s6">
          <i className="material-icons prefix">mail_outline</i>
          <input  type="text" placeholder="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

       <div className="input-field col s6">
          <i className="material-icons prefix">lock_outline</i>
          <input  type="text" placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <div className="input-field col s6">
          <i className="material-icons prefix">phone_android</i>
          <input  type="text" placeholder="PhoneNumber"
          value={phoneNumber}
          onChange={(e)=>setPhoneNumber(e.target.value)}
          />
        </div>

      <button className="btn waves-effect waves-light #0d47a1 blue darken-4"
      onClick={()=>PostData()}
      >
      SignUP
      </button>
      <h5>
          <Link to="/login">Already have an account?</Link>
      </h5>
</div>
</div>
        
    )
}

export default Signup