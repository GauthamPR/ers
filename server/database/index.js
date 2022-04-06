const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  publicAddress: String,
  nonce: String,
  permissions: [String],
});

const ExamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  year: Number,
  reviewers: [String],
});

const Users = mongoose.model("Users", UserSchema);
const Exams = mongoose.model("Exams", ExamSchema);

module.exports = {
  Users,
  Exams,
};
