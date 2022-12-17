import passport from "passport";
import local from "passport-local";
import { createHash, compareHash } from "../utils.js";
import userModel from "../models/userModel.js";

const LocalStrategy = local.Strategy;

//hardcoded admin
const admin = {
  _id: "admin65454sdf56sdf5sdf56",
  name: "admin",
  email: "admin@admin.com",
  password: "123",
  age: 100,
  phone: "123456789",
  address: "calle falsa 123",
  avatar:
    "https://images3.memedroid.com/images/UPLOADED212/5ecf56178abc5.jpeg",
  role: "admin",
};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { name, phone, address, age } = req.body;
        if (!name || !email || !password || !phone || !address)
          return done(null, false);

        try {
          let existUser = await userModel.findOne({ email: email });
          if (existUser) return done(null, false);

          const hashedPassword = createHash(password);

          let newUser = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            avatar: req.file.publicUrl,
            phone: phone,
            address: address,
            age: age,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          if (!email || !password) return done(null, false);

          if (email === admin.email && password === admin.password)
            return done(null, admin);

          let existUser = await userModel.findOne({ email: email });
          if (!existUser) return done(null, false);
          if (!compareHash(existUser, password)) return done(null, false);
          return done(null, existUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    //serialize admin
    if (user.email === admin.email) return done(null, user._id);
    //serialize user
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    //deserialize admin

    if (id === admin.email) return done(null, admin);
    //deserialize user
    const userFound = await userModel.findOne({ _id: id });
    done(null, userFound);
  });
};

export default initializePassport;
