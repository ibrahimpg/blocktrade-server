const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Report = require("../../models/Report");

router.post("/", (req, res) => {
    const newReport = new Report({
      _id: mongoose.Types.ObjectId(),
      content: req.body.reportContent,
      contact: req.body.reportContact,
      id: req.body.reportId
    });
    newReport
    .save()
    res.redirect("https://blocktrade.ibrahimpg.com/");
});

module.exports = router;