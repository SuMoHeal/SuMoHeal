import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () =>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
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
    return(
        <div style={{maxWidth:"700px", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"30px 0px",
                borderBottom:"2px solid grey"
            }}>
                <div>
                    <img style={{width:"200px",height:"180px",borderRadius:"100px"}}
                     src="https://img.favpng.com/23/4/11/computer-icons-user-profile-avatar-png-favpng-QsYtjsW73M0aGLb4GbMEyLbc5.jpg"
                    />
                </div>
                <div>
                <h4>{state?state.name:"loading"}</h4>
                <div  style={{display:"flex",justifyContent:"space-between",width:"120%"}}>
                      <h6 className="chip">{mypics.length}posts</h6>
                      <h6 className="chip">{state?state.followers.length:"0"}   followers</h6>
                      <h6 className="chip">{state?state.following.length:"0"}   following</h6>
                </div>
                </div>
            </div>
          <div className="gallery">
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