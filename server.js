const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
require("dotenv").config();
const port = process.env.PORT || 5000;

//route
const user = require("./routes/user");
const category = require("./routes/category");
const question = require("./routes/questions");
const course = require("./routes/course");
const exam = require("./routes/exam");
const result = require("./routes/result");
const classModel = require("./routes/class");

// app
const app = express();

// body parser middleaware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());

// connect db
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb conected !!!"))
  .catch((err) => console.log(err));

// passport config
require("./config/passport")(passport);

// set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// router
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/question", question);
app.use("/api/course", course);
app.use("/api/exam", exam);
app.use("/api/result", result);
app.use("/api/class", classModel);

// server static asts if in production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server running on ${port}`));
