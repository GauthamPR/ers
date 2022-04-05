require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
// require('./services/mail/index.js');
const routes = require("./routes");
const auth = require("./routes/middlewares/auth");
const logger = require("./utils/log");
const app = express();
app.use(express.static(process.cwd() + "/build/public"));
// app.use(express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("NODE_ENV:", process.env.NODE_ENV);
    auth.setStrategies(app);
    routes(app);

    app.listen(process.env.PORT || 3000, () =>
      logger.log("listening on Port", process.env.PORT)
    );
  });
