import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from 'react';
import { DarkMode } from './context/DarkMode'
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {
  const [dark, setDark] = useState(false)

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
    <DarkMode.Provider value={{dark, set}}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
    </DarkMode.Provider>
  );
}

export default App;
