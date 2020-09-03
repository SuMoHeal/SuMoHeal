import React from 'react';
import {Link} from 'react-router-dom'

const Aboutus =()=>{
    return (
        <div style={{textAlign:"center"}}>
            <h2> About SuMoHeal </h2>
        <div style={{textAlign:"center"}}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ocZj3GAsrdk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div >
        
        <h5>Web application that connects patients and donors to pay for hospital bills. !</h5>
        
        <h5> you can make your own profile to add post or to fill the healing form to help someone..</h5>
        </div>
        <h5>SuMoHeal User Can:</h5>
           
           <h5> -Make post </h5>
           <h5> -Edit his profile image </h5>
           <h5> -Be intrested and unintrested in any post </h5>
           <h5> -Make comments to all posts</h5>
           <h5> -Heal any other user </h5>
           <h5> -Follow and unFollow users</h5>
           <h5> -See other users profile page</h5>
           
        </div>
    )
}

export default Aboutus;