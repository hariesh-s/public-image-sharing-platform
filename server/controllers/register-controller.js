const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleRegistration = async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password)
      return res
         .status(400)
         .json({ message: "username and password are required!" });

   const user_already_exists = await User.findOne({
      username: username,
   }).exec();
   if (user_already_exists) return res.sendStatus(409); //status for conflict

   try {
      const hashed_password = await bcrypt.hash(password, 10);
      const new_user = await User.create({
         username: username,
         password: hashed_password,
      });
      res.status(201).json({ message: "new user successfully created" });
   } catch (err) {
      res.status(500).json({ message: err });
   }
};

module.exports = { handleRegistration };
