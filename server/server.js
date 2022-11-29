require('dotenv').config();
const mongoose = require("mongoose");
const verify_jwt = require("./middleware/verify-jwt")
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connecting to db
const connect_db = async () => {
   try {
      await mongoose.connect(process.env.DATABASE_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true
      })
   } catch(err) {
      console.log(err)
   }
}
connect_db()

app.use("/api/login", require("./routers/login-router"));
app.use("/api/register", require("./routers/register-router"));

app.use(verify_jwt)
app.get("/home", (req, res) => {
   res.json({ "message" : "hi there!" })
})

//run server when database is connected
mongoose.connection.once("open", () => {
   console.log("database connected!")
   app.listen(5000, () => {
      console.log("server listening on port 5000!");
   });
})
