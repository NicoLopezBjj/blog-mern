import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
