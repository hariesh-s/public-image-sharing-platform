import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import List from "../List/List";
import "./Home.css";

function Home() {
   return (
      <main className="home-main">
         <div className="file-list-wrapper">
            <p className="file-heading">My Files</p>
            <ul className="list">
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
               <List file_name="CN notes" className="list"></List>
               <List file_name="DBMS notes" className="list"></List>
            </ul>
         </div>
         <button className="add-file-btn">
            Add file
         </button>
      </main>
   );
}

export default Home;
