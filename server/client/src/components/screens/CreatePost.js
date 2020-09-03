import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'



const CreatePost = ()=>{
  const history = useHistory()
  const [title,setTitle] = useState("")
  const [amount,setAmount] = useState("")
  const [hospitalName,setHospitalName] = useState("")
  const [hospitalAddress,setHospitalAddress] = useState("")
  const [hospitalPhoneNumber,setHospitalPhoneNumber] = useState("")
  const [patientPhoneNumber,setPatientPhoneNumber] = useState("")
  const [descAboutPatientHealth,setDescAboutPatientHealth] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  
  useEffect(()=>{
    if(url){
     fetch("/createpost",{
         method:"post",
         headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
          title,
          amount,
          hospitalName,
          hospitalAddress,
          hospitalPhoneNumber,
          patientPhoneNumber,
          descAboutPatientHealth,
          pic:url
         })
     }).then(res=>res.json())
     .then(data=>{
 
        if(data.error){
           M.toast({html: data.error,classes:"#c62828 red darken-3"})
        }
        else{
            M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
            history.push('/')
        }
     }).catch(err=>{
         console.log(err)
     })
 }
 },[url])
  
  //using cloudinary for media upload 
  // files can be uploaded using an HTML <input type="file" /> 
  //input element, FormData() and fetch().
  const postDetails = ()=>{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset","sumoheal-clone")   //=> using cloudinary to upload image
    data.append("cloud_name","sarabelia")
    //making request to upload image
    fetch("	https://api.cloudinary.com/v1_1/sarabelia/image/upload",{
      method:"post",
      body: data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
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
          <i className="material-icons prefix" >subject</i>
          <input  type="text" placeholder="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
       <div className="input-field col s6">
          <i className="material-icons prefix">attach_money</i>
          <input  type="text" placeholder="amount"
           value={amount}
           onChange={(e)=>setAmount(e.target.value)}
          />
        </div>
       <div className="input-field col s6">
          <i className="material-icons prefix">local_hospital</i>
          <input  type="text" placeholder="Hospital Name"
           value={hospitalName}
           onChange={(e)=>setHospitalName(e.target.value)}
          />
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">place</i>
          <input  type="text" placeholder="Hospital Adress"
           value={hospitalAddress}
           onChange={(e)=>setHospitalAddress(e.target.value)}
          />
        </div>
       <div className="input-field col s6">
          <i className="material-icons prefix">phone</i>
          <input  type="text" placeholder="Hospital phoneNumber"
           value={hospitalPhoneNumber}
           onChange={(e)=>setHospitalPhoneNumber(e.target.value)}
          />
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">contact_phone</i>
          <input  type="text" placeholder="Patient phoneNumber" 
           value={patientPhoneNumber}
           onChange={(e)=>setPatientPhoneNumber(e.target.value)}
          />
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">mode_edit</i>
          <input  type="text" placeholder="Description About Patient Health & Situation"
           value={descAboutPatientHealth}
           onChange={(e)=>setDescAboutPatientHealth(e.target.value)}
          />
        </div>
       
        <div className="file-field input-field">
        <div className="btn #0d47a1 blue darken-4">
            <span>Upload Image</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
        </div>
        </div>
        <button className="btn waves-effect waves-light #0d47a1 blue darken-4" 
        onClick={()=>postDetails()}
        >
            Submit Post
            </button>
      </div>
  )
}

export default CreatePost