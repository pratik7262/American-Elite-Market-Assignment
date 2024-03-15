const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.js");
const followRoutes = require("./routes/follow.js");
const postRoutes = require("./routes/post.js");

/*CONFIGURATION*/
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/*Default Route*/

app.get("/", (req, res) => {
  res.send(
    "<p>This is assigment API for American-Elite-Market developed by <a href='https://pratikshinde.in' target='_blank'>Pratik Shinde</a>.</p>"
  );
});

/*API Routes*/
app.use("/api/auth", authRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
