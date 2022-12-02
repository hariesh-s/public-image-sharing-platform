const File = require("../models/File");

async function getAllFiles(req, res) {
   try {
      const allFiles = await File.find().select('fileName');
      res.status(201).send(allFiles);
   } catch (err) {
      res.status(500).json({ message: err });
   }
}

module.exports = { getAllFiles };
