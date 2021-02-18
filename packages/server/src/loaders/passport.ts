import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import UserModel from "models/user";
import { IUser } from "interfaces/IUser";

export default (jwtSecret: string): void => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user || !user.comparePassword(password)) {
            return done(null, false, {
              message: "Invalid email or password"
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
      },
      async (payload, done) => {
        try {
          const user = await UserModel.findOne({
            _id: payload._id,
            email: payload.email,
            role: payload.role
          });

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, (user as IUser)._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        done(true, false);
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
