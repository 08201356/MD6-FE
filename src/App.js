import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm2 from "./Components/RegisterForm2";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<RegisterForm2/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
