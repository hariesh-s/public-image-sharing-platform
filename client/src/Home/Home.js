import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FileUpload from "../Components/FileUpload/FileUpload";
import "./Home.css";

function Home() {
   const [myFiles, setMyFiles] = useState([]);
   const [ isModalShown, setModalShown ] = useState(false)

   useEffect(() => {
      fetch("/api/files")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            console.log(data);
            setMyFiles(data);
         });
   }, [isModalShown]);

   function toggleForm() {
      setModalShown(true)
   }

   return (
      <main className="home-main">
         { isModalShown && 
            <FileUpload isShown={isModalShown} setShown={setModalShown}/>
         }
         <div className="file-list-wrapper">
            <p className="file-heading">My Files</p>
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
         <button className="add-file-btn" onClick={toggleForm}>Add file</button>
      </main>
   );
}

export default Home;
