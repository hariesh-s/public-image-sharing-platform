import { useState } from "react";
import "./FileUpload.css";

function FileUpload({ isShown, setShown }) {
   const [file, setFile] = useState();

   function handleFileUpload(e) {
      e.preventDefault();
      console.log("upload");
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
   }

   function handleSubmit(e) {
      e.preventDefault();
      console.log("submit");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);

      fetch("/api/file-upload", {
         method: "POST",
         body: formData,
      })
         .then((response) => {
            const data = response.json();
            console.log(data);
            setShown(false);
         })
         .catch((err) => {
            console.log(err);
         });
   }

   return (
      <form className="modal-wrapper" onSubmit={handleSubmit}>
         <div className="modal">
            <header className="modal-header">File Upload</header>
            <section className="modal-body">
               <input name="newFile" type="file" onChange={handleFileUpload} />
            </section>
            <footer className="modal-footer">
               <button type="submit">Upload</button>
               <button type="button" onClick={(e) => setShown(false)}>
                  Close
               </button>
            </footer>
         </div>
      </form>
   );
}

export default FileUpload;
