const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/login", (req, res) => {
   console.log(req.body);
   //need to modify
   //has to compare password with db and then send an 
   //appropriate response
   res.json({
      message: "received credentials"
   });
});

app.post("/api/register", (req, res) => {
   console.log(req.body);
   res.json({
      message: "received credentials"
   });
});

app.listen(5000, () => {
   console.log("server listening on port 5000");
});
