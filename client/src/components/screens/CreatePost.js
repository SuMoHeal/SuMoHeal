import React from 'react'

const CreatePost = ()=>{
  return(
      <div className="card input-filed" 
      style={{
          margin:"30px auto",
          maxWidth:"500px",
          padding:"30px",
          textAlign:"center"
      }}
      >
        <h2>SuMoHeal</h2>
     
       <div className="input-field col s6">
          <i className="material-icons prefix">subject</i>
          <input  type="text" placeholder="title"/>
        </div>
       <div className="input-field col s6">
          <i className="material-icons prefix">attach_money</i>
          <input  type="text" placeholder="amount"/>
        </div>
       <div className="input-field col s6">
          <i className="material-icons prefix">local_hospital</i>
          <input  type="text" placeholder="Hospital Name"/>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">place</i>
          <input  type="text" placeholder="Hospital Adress"/>
        </div>
       <div className="input-field col s6">
          <i className="material-icons prefix">phone</i>
          <input  type="text" placeholder="Hospital phoneNumber"/>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">contact_phone</i>
          <input  type="text" placeholder="Patient phoneNumber"/>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">mode_edit</i>
          <input  type="text" placeholder="Description About Patient Health & Situation"/>
        </div>
       
        <div className="file-field input-field">
        <div className="btn #0d47a1 blue darken-4">
            <span>Upload Image</span>
            <input type="file" />
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
        </div>
        </div>
        <button className="btn waves-effect waves-light #0d47a1 blue darken-4" >
            Submit Post
            </button>
      </div>
  )
}

export default CreatePost