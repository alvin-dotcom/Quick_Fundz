const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:["GET", "PATCH", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(cookieParser());

const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP"
});

app.use("/Quick-Fundz", limiter);
app.use(xss());
app.use(routes); 

module.exports = app;
