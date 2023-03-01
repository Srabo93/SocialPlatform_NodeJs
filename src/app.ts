import express, { Request, Response, NextFunction } from "express";
import path from "path";
import methodOverride from "method-override";
import connectDB from "./config/db";
import session from "express-session";
import { SESSION_SECRET, MONGO_URI, ENVIRONMENT } from "./config/config";
import MongoStore from "connect-mongo";
import passport from "passport";
import {
  passportConfig,
  deserializeUser,
  serializeUser,
} from "./config/passport";
import { engine } from "express-handlebars";
import { editIcon, stripString, formatDate, select } from "./helpers/hbs";
import morgan from "morgan";
/*Routes */
import storyRoutes from "./routes/stories";
import authRoutes from "./routes/auth";
import index from "./routes/index";

/*Connect DB */
connectDB();
/*Initialize App */
const app = express();
/*Body Parser */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/*Define Static Folder */
app.use(express.static(path.join(`${__dirname}/public`)));
/*Method Override for Http Requests */
app.use(
  methodOverride(function (req: Request, res: Response) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
/*Logging Devenviroment */
if (`${ENVIRONMENT}` === "development") {
  app.use(morgan("dev"));
}

/*Handlebars */
app.engine(
  ".hbs",
  engine({
    helpers: { formatDate, stripString, editIcon, select },
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./src/views/");

/*Sessions */
app.use(
  session({
    secret: `${SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${MONGO_URI}`,
      autoRemove: "native",
    }),
  })
);

/*Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());
passportConfig;
serializeUser;
deserializeUser;
/*Set globar vars*/
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.locals.user = req.user || null;
  next();
});

app.use("/", index);
app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);

/*Define Ports */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
