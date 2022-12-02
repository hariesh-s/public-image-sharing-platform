import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   localStorage.setItem("loginStatus", "false");

   // setting focus on username input on load
   const usernameRef = useRef();
   useEffect(() => {
      usernameRef.current.focus();
   }, []);

   const navigate = useNavigate();

   function handleLogin(e) {
      e.preventDefault();

      const userCredentials = {
         username,
         password,
      };

      fetch("/api/login", {
         method: "POST",
         headers: {
            "Content-Type": "Application/json",
         },
         body: JSON.stringify(userCredentials),
      }).then((response) => {
         localStorage.setItem("loginStatus", "true");
         navigate("/home", { replace: true });
      });
   }

   return (
      <main className="login-wrapper">
         <form className="login-form" onSubmit={handleLogin}>
            <section className="login-title">Sign in</section>
            <section className="login-field">
               <input
                  type="text"
                  name="username"
                  className="login-input"
                  id="username"
                  ref={usernameRef}
                  placeholder=" "
                  autoComplete="off"
                  required
                  onChange={(e) => setUsername(e.target.value)}
               />
               <label htmlFor="username" className="login-label">
                  Username
               </label>
            </section>
            <section className="login-field">
               <input
                  type="password"
                  name="password"
                  className="login-input"
                  id="password"
                  placeholder=" "
                  autoComplete="off"
                  required
                  onChange={(e) => setPassword(e.target.value)}
               />
               <label htmlFor="password" className="login-label">
                  Password
               </label>
            </section>
            <Link to="/register" className="register-link">
               Haven't got an account? Click here!
            </Link>
            <button className="login-btn">Login</button>
         </form>
      </main>
   );
}

export default Login;
