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

const AnswerSheetSchema = new mongoose.Schema({
  name: String,
  hashValue: String,
});

const AssignedReviewsSchema = new mongoose.Schema({
  reviewerPA: String,
  examId: String,
  count: Number,
});

const Users = mongoose.model("Users", UserSchema);
const Exams = mongoose.model("Exams", ExamSchema);
const AnswerSheets = mongoose.model("AnswerSheets", AnswerSheetSchema);
const AssignedReviews = mongoose.model(
  "AssignedReviews",
  AssignedReviewsSchema
);

module.exports = {
  Users,
  Exams,
  AnswerSheets,
  AssignedReviews,
};
