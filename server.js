const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongoURI;

//CONNECT TO MONGODB

mongoose
  .connect(db)
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch(err => {
    console.error(err);
  });

app.use(passport.initialize());

require("./config/passport")(passport);

//ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
