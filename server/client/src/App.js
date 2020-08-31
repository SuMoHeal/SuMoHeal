import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import "./App.css"
import NavBar from './components/Navbar'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from "./components/screens/SubscribesUserPosts";
import Healing from './components/screens/Healing';

export const UserContext = createContext()

// creating routing so we can access history  
const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
     const user = JSON.parse(localStorage.getItem("user"))
     if(user){
       dispatch({type:"USER",payload:user})
     }else{
       history.push('/login')
     }
  },[])
return(
  <Switch>
  <Route  exact path="/">
       <Home />
     </Route>
     <Route path="/login">
       <Login />
     </Route>
     <Route path="/signup">
       <Signup/>
     </Route>
     <Route exact path="/profile">
       <Profile />
     </Route>
     <Route path="/create">
       <CreatePost />
     </Route>
     <Route path="/profile/:userid">
       <UserProfile />
     </Route>
     <Route path="/myfollowingpost">
       <SubscribedUserPosts />
     </Route>
     <Route path="/healing">
       <Healing />
     </Route>
     </Switch>
)
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>

     <NavBar />
     <Routing />

    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
