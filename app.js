const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const { engine } = require("express-handlebars");
const morgan = require("morgan");

/*Load Config */
dotenv.config({ path: "./config/config.env" });
/*Passport Config */
require("./config/passport")(passport);
/*Connect DB */
connectDB();
/*Initialize App */
const app = express();
/*Body Parser */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/*Logging Devenviroment */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/*Handlebars Helper */
const { formatDate, stripString, editIcon, select } = require("./helpers/hbs");
/*Handlebars */
app.engine(
  ".hbs",
  engine({
    helpers: { formatDate, stripString, editIcon, select },
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
/*Sessions */
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      autoRemove: "native",
    }),
  })
);
/*Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());

/*Set globar vars*/
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
/*Routes */
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));
/*Define Static Folder */
app.use(express.static(path.join(__dirname, "public")));
/*Define Ports */
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
