const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true
}))



app.use(bodyParser.json());
app.use(express.json({limit: "16kb"}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(helmet());

const limiter = rateLimit({
    max:3000,
    windowMs:60*60*1000,
    message:"Too many Request from this IP"
})
app.use("/Quick-Fundz",limiter);
app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(xss());
//routes import
app.use(routes);

// http://localhost:8000/api/v1/users/register

module.exports = app;


