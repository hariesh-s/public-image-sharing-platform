import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home";
import File from "./File/File";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Navigate to="/login"/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/home/:name" element={<File/>}></Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>
);
