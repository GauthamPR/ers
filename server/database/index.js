const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  publicAddress: String,
  nonce: String,
  permissions: [String],
});

const ExamSchema = new mongoose.Schema({
  name: String,
  month: String,
  year: Number,
  type: String,
  reviewers: [String],
});

const Users = mongoose.model("Users", UserSchema);
const Exams = mongoose.model("Exams", ExamSchema);

module.exports = {
  Users,
  Exams,
};
