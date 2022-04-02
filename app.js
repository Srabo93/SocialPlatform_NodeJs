const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
/*Load Config */
dotenv.config({ path: "./config/config.env" });
/*Passport Config */
require("./config/passport")(passport);
/*Connect DB */
connectDB();
/*Initialize App */
const app = express();
/*Logging Devenviroment */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/*Handlebars */
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
/*Sessions */
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
/*Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());
/*Routes */
app.use("/", require("./routes/index"));
/*Define Static Folder */
app.use(express.static(path.join(__dirname, "public")));
/*Define Ports */
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
