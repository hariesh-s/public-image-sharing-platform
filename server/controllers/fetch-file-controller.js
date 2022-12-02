const File = require("../models/File");

async function fetchFile(req, res) {
   const fileName = req.params.name;

   const found_file = await File.findOne({ fileName: fileName }).exec();

   if (!found_file)
      return res.status(400).json({ message: "File doesn't exist" });

   res.send(found_file);
}

module.exports = { fetchFile };
