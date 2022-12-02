const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
   fileName: String,
   content: Buffer,
   size: Number,
   encoding: String,
   mimetype: String
});

module.exports = mongoose.model("File", fileSchema);
