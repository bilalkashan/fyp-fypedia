  const mongoose = require("mongoose");

  const FypSubmissionSchema = new mongoose.Schema({
    title: String,
    groupMembers: [String],
    description: String,
    projectLink: String,
    srs: String, // base64
    sds: String, // base64
    video: String, // base64
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    // adviserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isVerified: { type: Boolean, default: false },
  }, { timestamps: true });

  module.exports = mongoose.model("FypSubmission", FypSubmissionSchema);
