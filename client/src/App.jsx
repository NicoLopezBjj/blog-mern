import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from 'react';
import { DarkMode } from './context/DarkMode'
import { Translate } from './context/Translate'
import { User } from './context/User'
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import NoPage from './components/NoPage';

function App() {
  const [dark, setDark] = useState(false)
  const [user, setUser] = useState(null)

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
    <User.Provider value={{user, setUser}}>
      <DarkMode.Provider value={{dark, set}}>
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Hero/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="*" element={<NoPage/>}></Route>
        </Routes>
      </BrowserRouter>
      </DarkMode.Provider>
    </User.Provider>
  );
}

export default App;
