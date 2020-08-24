import React from 'react';

const Home = ()=>{
   
    return(
      <div className="home">
      <div className="card home-card">
<div className="card-image waves-effect waves-block waves-light">
  <img className="activator" src="https://image.shutterstock.com/image-illustration/3d-illustration-flower-background3d-wallpaper-260nw-1392043274.jpg" />
</div>
<div className="card-content">
  <span className="card-title activator grey-text text-darken-4"> Title
  <i className="material-icons right">more_vert</i>
      <i className="material-icons right"> delete_forever </i>
      <i className="material-icons right">  healing </i>
  </span>
  <span className="card-title activator grey-text text-darken-4">Amount</span>
  <div>
  <span>Hospital Name</span>
  </div>
  <div>
  <span>Hospital Adress</span>
  </div>
  <div>
  <span>Hospital phoneNumber</span>
  </div>
  <div>
  <span>Patient phoneNumber</span>
  </div>
  <div>
  <span>Description About Patient Health & Situation</span>
  </div>
</div> 
</div>
</div>
    )
}

export default Home