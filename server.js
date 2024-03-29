const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");
const path = require("path");

app.use(cors());
var PORT = process.env.PORT || 8080;
// prevent CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(fileUpload());

// Error Handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data; // Passing original error data
  res.status(status).json({ message: message, data: data });
});

//User's session
var MemoryStore = session.MemoryStore;
app.use(
  session({
    name: "scribbleday",
    secret: "scribbleday",
    resave: false,
    store: new MemoryStore(),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 7 }, // 7 Days
  })
);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(require("./routes/index"));

// if (process.env.NODE_ENV === "production") {
app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
// }

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT:  ${PORT}`);
});
