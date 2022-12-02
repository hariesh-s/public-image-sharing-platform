require("dotenv").config();
const file_upload = require("express-fileupload");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(file_upload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connecting to db
const connect_db = async () => {
   try {
      await mongoose.connect(process.env.DATABASE_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
      });
   } catch (err) {
      console.log(err);
   }
};
connect_db();

app.use("/", require("./routers/login-router"));
app.use("/", require("./routers/register-router"));
app.use("/", require("./routers/files-router"));
app.use("/", require("./routers/file-upload-router"));
app.use("/", require("./routers/fetch-file-router"));

//run server when database is connected
mongoose.connection.once("open", () => {
   console.log("database connected!");
   app.listen(5000, () => {
      console.log("server listening on port 5000!");
   });
});
