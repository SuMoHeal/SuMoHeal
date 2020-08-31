import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home = ()=>{
   const [data,setData] = useState([])
   const {state,dispatch} = useContext(UserContext)
   useEffect (()=>{
       fetch('/getsubpost',{
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
  const makeComment = (text,postId)=>{
    fetch('/comment',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
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

  const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
      method:"delete",
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = data.filter(item=>{
        return item._id !== result._id
      })
      setData(newData)
    })
  }

    return(
      <div className="home">
       {
         data.map(item=>{
            return (
              <div className="card home-card" key={item._id}>
                 <div  style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
              <Link to={item.postedBy._id != state._id ?"/profile/"+item.postedBy._id :"/profile/"}>
              <h5 className="chip">
              <img style={{width:"40px",height:"40px",borderRadius:"100px",position:"sticky"}}
                src={item.postedBy.pic}
                  />
                  {item.postedBy.name} 
                  </h5>
              </Link>
            
              </div>
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={item.photo} />
              </div>
              <div className="card-content">
             
                <span className="card-title activator grey-text text-darken-4">
                <i className="material-icons right">more_vert</i>
                      {
                      item.postedBy._id == state._id  &&  <i className="material-icons right"
                      onClick={()=>deletePost(item._id)}
                      > delete_forever </i>
                      
                      }
                    
         
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
                   
                   <Link to="/healing" >
                <i className="material-icons right">  healing </i> </Link>
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
            {
                item.comments.map(record=>{
                  return(
 
                  <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                
                  )
                })
              }
            <form onSubmit={(e)=>{
              e.preventDefault()
              makeComment(e.target[0].value,item._id)
            }}>
              
              <input type="text" placeholder="add a comment"/>
                   
            </form>
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