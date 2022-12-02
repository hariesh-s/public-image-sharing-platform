import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_@#]{3,24}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9_@#]{7,24}$/;

function App() {
   const [username, setUsername] = useState("");
   const [isUsernameErrShown, setUsernameErrShown] = useState(false);

   const [password, setPassword] = useState("");
   const [isPasswordErrShown, setPasswordErrShown] = useState(false);

   const [confirmPwd, setConfirmPwd] = useState("");
   const [isConfirmPwdErrShown, setConfirmPwdErrShown] = useState(false);

   // setting focus on username input on load
   const usernameRef = useRef();
   useEffect(() => {
      usernameRef.current.focus();
   }, []);

   const navigate = useNavigate();

   function handleUsernameChange(e) {
      const newUsername = e.target.value;
      setUsername(newUsername);

      const result = USERNAME_REGEX.test(newUsername);
      setUsernameErrShown(!result);
   }

   function handlePasswordChange(e) {
      const newPassword = e.target.value;
      setPassword(newPassword);

      const result = PASSWORD_REGEX.test(newPassword);
      setPasswordErrShown(!result);

      // confirm password needs to match password when password is changed
      const match = newPassword === confirmPwd;
      setConfirmPwdErrShown(!match);
   }

   function handleConfirmPwdChange(e) {
      const confirmedPassword = e.target.value;
      setConfirmPwd(confirmedPassword);

      const match = password === confirmedPassword;
      setConfirmPwdErrShown(!match);
   }

   function handleRegistration(e) {
      e.preventDefault();

      const newUserDetails = {
         username,
         password,
      };

      fetch("/api/register", {
         method: "POST",
         headers: {
            "Content-Type": "Application/json",
         },
         body: JSON.stringify(newUserDetails),
      }).then((response) => {
         const data = response.json();
         console.log(data);
         navigate("/login", { replace: true });
      });
   }

   return (
      <main className="register-wrapper">
         <form className="register-form" onSubmit={handleRegistration}>
            <section className="register-title">Sign up</section>
            <section className="register-field">
               <input
                  type="text"
                  name="username"
                  className="register-input"
                  id="username"
                  ref={usernameRef}
                  placeholder=" "
                  autoComplete="off"
                  required
                  onChange={handleUsernameChange}
                  onBlur={() => setUsernameErrShown(false)}
               />
               <label htmlFor="username" className="register-label">
                  Username
               </label>
               {isUsernameErrShown && (
                  <p className="register-errmsg">
                     Must contain 4 to 24 characters. <br />
                     Must start with an alphabet. <br />
                     Special characters _,@,# are allowed.
                  </p>
               )}
            </section>
            <section className="register-field">
               <input
                  type="password"
                  name="password"
                  className="register-input"
                  id="password"
                  placeholder=" "
                  autoComplete="off"
                  required
                  onChange={handlePasswordChange}
                  onBlur={() => setPasswordErrShown(false)}
               />
               <label htmlFor="password" className="register-label">
                  Password
               </label>
               {isPasswordErrShown && (
                  <p className="register-errmsg">
                     Must contain 8 to 24 characters. <br />
                     One uppercase, one lowercase and one special character must
                     be present. <br />
                     Special characters _,@,# are allowed.
                  </p>
               )}
            </section>
            <section className="register-field">
               <input
                  type="password"
                  name="confirm-password"
                  className="register-input"
                  id="confirm-password"
                  placeholder=" "
                  autoComplete="off"
                  required
                  onChange={handleConfirmPwdChange}
                  onBlur={() => setConfirmPwdErrShown(false)}
               />
               <label htmlFor="confirm-password" className="register-label">
                  Confirm Password
               </label>
               {isConfirmPwdErrShown && (
                  <p className="register-errmsg">
                     Must match your password field.
                  </p>
               )}
            </section>
            <button
               disabled={
                  isUsernameErrShown ||
                  isPasswordErrShown ||
                  isConfirmPwdErrShown
               }
               className="register-btn"
            >
               Register
            </button>
         </form>
      </main>
   );
}

export default App;
