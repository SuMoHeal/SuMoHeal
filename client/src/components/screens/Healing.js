import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Healing =() =>{
    return (
        <div className="mycard">
        <div className="card auth-card input-field">
        <h2>SuMoHeal</h2>
    
       <div className="input-field col s6">
           <h6 style={{textAlign:"left"}}>How much you can pay?</h6>
            <input  type="text"  />
          </div>
          <div className="input-field col s6">
            <h6  style={{textAlign:"left"}}>How do you want to pay?</h6>
            <input  type="text" />   
          </div>
        <button className="btn waves-effect waves-light #0d47a1 blue darken-4">
        Submit
        </button>

        </div>
        <h6 style={{textAlign:"center"}}>"please know that we will send email to the user about this information and we will keep in touch with poth sides 
            to make sure that every thing is good!" 
        </h6>
        <h6 style={{textAlign:"center"}}>We will appreciate if you send us feed back about patient health situation
           on this email "hammamiamneh7@gmail.com"</h6>
        </div>
         
        
    )
}

export default Healing