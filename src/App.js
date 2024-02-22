import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./Components/RegisterForm";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<RegisterForm/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
