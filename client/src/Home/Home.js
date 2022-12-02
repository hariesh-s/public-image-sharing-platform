import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "../Components/FileUpload/FileUpload";
import "./Home.css";

function Home() {
   const [myFiles, setMyFiles] = useState([]);
   const [isModalShown, setModalShown] = useState(false);
   const navigate = useNavigate()

   useEffect(() => {
      fetch("/api/files")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            console.log(data);
            setMyFiles(data);
            console.log(localStorage.getItem("loginStatus"));
         });
   }, [isModalShown]);

   function toggleForm() {
      setModalShown(true);
   }

   function handleLogout() {
      localStorage.setItem("loginStatus", "false")
      navigate("/login")
   }

   return (
      <>
         {localStorage.getItem("loginStatus") === "true" && (
            <main className="home-main">
               {isModalShown && (
                  <FileUpload isShown={isModalShown} setShown={setModalShown} />
               )}
               <div className="file-list-wrapper">
                  <p className="file-heading">Image gallery</p>
                  <div className="list-wrapper">
                     <ul className="list">
                        {myFiles.map((file) => (
                           <li key={file.fileName}>
                              <Link className="list-element" to={file.fileName}>
                                 {file.fileName}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <button className="add-file-btn" onClick={toggleForm}>
                  Add file
               </button>
               <button className="logout-btn" onClick={handleLogout}>
                  Logout
               </button>
            </main>
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

export default Home;
