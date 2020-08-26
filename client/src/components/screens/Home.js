import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'

const Home = ()=>{
   const [data,setData] = useState([])
   const {state,dispatch} = useContext(UserContext)
   useEffect (()=>{
       fetch('/allpost',{
         headers:{
           "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
       }).then(res=>res.json())
       .then(result=>{
         console.log(result)
         setData(result.posts)
       })
   },[])

   const intrestedPost = (id)=>{
     fetch('/intrested',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId:id
      })
     }).then(res=>res.json())
     .then(result=>{
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
     }).catch(err=>{
       console.log(err)
     })
   }

   const unintrestedPost = (id)=>{
    fetch('/unintrested',{
     method:"put",
     headers:{
       "Content-Type":"application/json",
       "Authorization":"Bearer "+localStorage.getItem("jwt")
     },
     body: JSON.stringify({
       postId:id
     })
    }).then(res=>res.json())
    .then(result=>{
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

    return(
      <div className="home">
       {
         data.map(item=>{
            return (
              <div className="card home-card" key={item._id}>
                <h5>{item.postedBy.name}</h5>
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={item.photo} />
              </div>
              <div className="card-content">
             
                <span className="card-title activator grey-text text-darken-4">
                <i className="material-icons right">more_vert</i>
                    <i className="material-icons right"> delete_forever </i>
                    {item.intrested.includes(state._id)
                    ? 
                    <i className="material-icons " 
                       onClick={()=>{unintrestedPost(item._id)}}
                    > thumb_down </i>
                    : 
                    <i className="material-icons " 
                    onClick={()=>{intrestedPost(item._id)}}
                    > thumb_up </i>
                    }
                   
                    <i className="material-icons right ">  healing </i>
              <h6>{item.intrested.length} intrested</h6>
              <h6> {item.title}</h6>
                </span>
            <span className="card-title activator grey-text text-darken-4">{item.amount}</span>
                <div>
            <span>{item.hospitalName}</span>
                </div>
                <div>
            <span>{item.hospitalAddress}</span>
                </div>
                <div>
            <span>{item.hospitalPhoneNumber}</span>
                </div>
                <div>
            <span>{item.patientPhoneNumber}</span>
                </div>
                <div>
            <span>{item.descAboutPatientHealth}</span>
                </div>
              </div> 
              </div>
              
            )
         })
       }

   
</div>
    )
}

export default Home