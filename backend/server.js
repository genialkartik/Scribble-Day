const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
app.use(cors());
var PORT = process.env.PORT || 4000;
// prevent CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(fileUpload());

//User's session
var MemoryStore = session.MemoryStore;
app.use(
  session({
    name: "scribbleday",
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    store: new MemoryStore(),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 7 }, // 7 Days
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(require("./routes/index"));
app.use(require("./routes/verify"));

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT:  ${PORT}`);
});