import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>
);
