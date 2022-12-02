const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password)
      return res
         .status(400) //bad request
         .json({ message: "username and password are required!" });

   const user_found = await User.findOne({ username: username }).exec();
   
   if (!user_found) return res.sendStatus(401); //unauthorized

   const password_match = await bcrypt.compare(password, user_found.password);
   if (password_match) {
      const access_token = jwt.sign(
         { username: user_found.username },
         process.env.SECRET_ACCESS_TOKEN,
         { expiresIn: "30s" }
      );

      const refresh_token = jwt.sign(
         { username: user_found.username },
         process.env.SECRET_REFRESH_TOKEN,
         { expiresIn: "1d" }
      );

      res.cookie("jwt", refresh_token, {
         httpOnly: true,
         sameSite: "None",
         maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ access_token }); //unauthorized
   } else return res.sendStatus(401);
};

const handleLogout = (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.sendStatus(204); //no content
   res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
   });
   res.json({ message: "cookie cleared" });
};

module.exports = { handleLogin, handleLogout };
