const File = require("../models/File");

async function handleFileUpload(req, res) {
   if (!req.files)
      return res.status(400).json({ message: "No files were uploaded." });

   // access the files uploaded as req.files."name"
   const uploadedFile = req.files.file;

   const file_already_exists = await File.findOne({
      fileName: uploadedFile.name,
   }).exec();
   if (file_already_exists) return res.sendStatus(409); //status for conflict

   try {
      const newFile = await File.create({
         fileName: uploadedFile.name,
         content: uploadedFile.data,
         size: uploadedFile.size,
         encoding: uploadedFile.encoding,
         mimetype: uploadedFile.mimetype,
      });
      res.status(201).json({ message: "file uploaded!" });
   } catch (err) {
      res.status(500).json({ message: err });
   }
}

module.exports = { handleFileUpload };
