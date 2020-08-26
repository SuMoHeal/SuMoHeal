import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () =>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           setProfile(result)
       })
    },[])


    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data)) 
             setProfile((prevState)=>{
                 return{
                     ...prevState,
                     user:data
                 }
             })
            })
    }
    return(
        <>
        {userProfile ?
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
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>

              <div style={{display:"flex",justifyContent:"space-between",width:"120%"}}>
                  <h6>{userProfile.posts.length}posts</h6>
                  <h6>{userProfile.user.followers.length} followers</h6>
                  <h6>{userProfile.user.following.length}following</h6>
              </div>
              <button className="btn waves-effect waves-light #0d47a1 blue darken-4"
               onClick={()=>followUser()}
              >
              Follow
              </button>
              </div>
          </div>
        <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return(
                      <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                    )
                })
            }
         
        </div>
      </div> 
         : <h2>loading...!</h2>}
      
        </>
    )
}

export default Profile