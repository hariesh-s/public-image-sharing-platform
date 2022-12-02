import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./File.css";

function File() {
   const [image, setImage] = useState();
   const location = useLocation();

   useEffect(() => {
      fetch("/api" + location.pathname)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            const base64Flag = "data:image/jpeg;base64,";
            const imageStr = arrayBufferToBase64(data.content.data);
            setImage(base64Flag + imageStr);
         })
         .catch((err) => {
            console.log(err);
         });
   });

   function arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
   }

   return (
      <>
         {localStorage.getItem("loginStatus") === "true" && (
            <div className="img-wrapper">
               <img src={image} className="img" alt="Loading ...."></img>
            </div>
         )}
         {(localStorage.getItem("loginStatus") === "false" ||
            localStorage.getItem("loginStatus") === null) && (
            <>
               <p> Please login to get access ! </p>
               <Link to="/login">Login</Link>
            </>
         )}
      </>
   );
}

export default File;
