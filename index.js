const express = require("express");
const app = express();
const mongoose = require("mongoose");

const articles = require("./routes/api/articles");
const users = require("./routes/api/users");
const reports = require("./routes/api/reports");

//BodyParser Middleware
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connecting to Mongo
mongoose.connect(`${process.env.MLAB_URL}`)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Use Routes
app.use("/api/articles", articles);
app.use("/api/users", users);
app.use("/api/reports", reports);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));