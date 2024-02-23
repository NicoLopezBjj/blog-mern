import './App.css';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from 'react';
import { DarkMode } from './context/DarkMode'
import { Translate } from './context/Translate'
import { User } from './context/User'
import { PostData } from './context/PostData'
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Friend from './components/Friend';
import AddPost from './components/AddPost';
import Post from './components/Post';
import ModRequest from './components/ModRequest';
import ModCode from './components/ModCode';
import Requests from './components/admin/Requests'
import Request from './components/admin/Request';
import NoPage from './components/NoPage';

function App() {
  const [dark, setDark] = useState(false)
  const [user, setUser] = useState(null)
  const [likes, setLikes] = useState(0)
  const [visits, setVisits] = useState(0)

  const LogOut = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    console.log("usuario en logout front", user)
    const out = await axios.get("http://localhost:3001/signout")
    if(out.data == "Logged out"){
      console.log("se fue del back... creeemos")
    }
  }

  function set(){
    setDark(!dark)
  }

  let body = document.querySelector("body")
  
  if(dark){ 
    body.style.backgroundColor="#444444" 
  }else{
    body.style.backgroundColor="white"
  }

  return (
    <User.Provider value={{user, setUser, LogOut}}>
      <DarkMode.Provider value={{dark, set}}>
        <PostData.Provider value={{likes,setLikes,visits,setVisits}}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Hero/>}></Route>
              <Route path="/signin" element={<SignIn/>}></Route>
              <Route path="/signup" element={<SignUp/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/user/:userId" element={<Friend/>}></Route>
              <Route path="/add" element={<AddPost/>}></Route>
              <Route path="/post/:userId/:postId" element={<Post/>}></Route>
              <Route path="/mod" element={<ModRequest/>}></Route>
              <Route path="/mod/code" element={<ModCode/>}></Route>
              <Route path="/mod/requests" element={<Requests/>}></Route>
              <Route path="/mod/request/:userId" element={<Request/>}></Route>
              <Route path="*" element={<NoPage/>}></Route>
            </Routes>
          </BrowserRouter>
        </PostData.Provider>
      </DarkMode.Provider>
    </User.Provider>
  );
}

export default App;
