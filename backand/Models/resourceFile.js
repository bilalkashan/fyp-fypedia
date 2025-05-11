const mongoose = require("mongoose");

const resourceFileSchema = new mongoose.Schema({
  fileName: String,
  fileData: Buffer,
  fileType: String,
  uploadedAt:{
    type:Date,
    default:Date.now
    },
});

module.exports = mongoose.model("ResourceFile", resourceFileSchema);
