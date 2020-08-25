import React,{useState,useEffect} from 'react';

const Home = ()=>{
   const [data,setData] = useState([])
   useEffect (()=>{
       fetch('/allpost',{
         headers:{
           "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
       }).then(res=>res.json())
       .then(result=>{
         setData(result.posts)
       })
   },[])
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
                <span className="card-title activator grey-text text-darken-4"> {item.title}
                <i className="material-icons right">more_vert</i>
                    <i className="material-icons right"> delete_forever </i>
                    <i className="material-icons right">  healing </i>
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