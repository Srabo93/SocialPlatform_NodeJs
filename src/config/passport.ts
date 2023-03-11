import User from "../models/User";
import passport from "passport";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./config";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

export const passportConfig = passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://storytime-y7qk.onrender.com/auth/google/callback",
    },
    async (
      accessToken: any,
      refreshToken: any,
      profile: { id: any; displayName: any; photos: { value: any }[] },
      done
    ) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        image: profile.photos[0].value,
      };
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          user = await User.create(newUser);
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
export const serializeUser = passport.serializeUser((user: any, done: any) =>
  done(null, user.id)
);
export const deserializeUser = passport.deserializeUser(
  (id: string, done: any) =>
    User.findById(id, (err: any, user: any) => done(err, user))
);

export * from "./passport";
