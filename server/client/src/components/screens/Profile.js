import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import { data } from 'jquery'


const Profile = () =>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
        if(image){
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
             
            //   localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            //   dispatch({type:"UPDATEPIC",payload:data.url})
              fetch('/updatepic',{
                  method:"put",
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                  },
                  body:JSON.stringify({
                      pic:data.url
                  })
              }).then(res=>res.json())
              .then(result=>{
                  console.log(result)
                  localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                  dispatch({type:"UPDATEPIC",payload:result.pic})
                 
                })
            
            })
            .catch(err=>{
              console.log(err)
            })
        }
    },[image])

    const updatePhoto = (file)=>{
        setImage(file)
       console.log(data)
    }

    return(
        <div style={{maxWidth:"700px", margin:"0px auto"}}>
           <div style={{
                margin:"30px 0px",
                borderBottom:"2px solid grey",
            }}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
            }}>
                <div>
                    <img style={{width:"250px",height:"200px",borderRadius:"100px"}}
                     src={state?state.pic:"loading"}
                    />
                    
                </div>
                <div>
                <h4>{state?state.name:"loading"}</h4>
                <h5>{state?state.email:"loading"}</h5>

                <div  style={{display:"flex",justifyContent:"space-between",width:"120%"}}>
                      <h6 className="chip">{mypics.length}posts</h6>
                      <h6 className="chip">{state?state.followers.length:"0"}   followers</h6>
                      <h6 className="chip">{state?state.following.length:"0"}   following</h6>
                </div>
                </div>
            </div>
     
                         <div className="file-field input-field" style={{margin:"10px"}}>
                        <div className="btn #0d47a1 blue darken-4">
                            <span>Update picture</span>
                            <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                        </div>
                        </div>
          <div className="gallery" >

              {
                  mypics.map(item=>{
                      return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                      )
                  })
              }
           </div>
          </div>
          
      
    )
}

export default Profile