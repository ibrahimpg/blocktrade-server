const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  contact: {type: String, required: true},
  id: {type: String, required: true}
});

module.exports = Report = mongoose.model("report", ReportSchema);