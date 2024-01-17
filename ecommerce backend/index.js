const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";
const path = require("path");

const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const cookiParser = require("cookie-parser");

const { isAuth, sanitiseUser, cookieExtractor } = require("./services/common");
const ProductsRouter = require("./routes/Products");
const CategoriesRouter = require("./routes/Categories");
const BrandsRouter = require("./routes/Brands");
const UsersRouter = require("./routes/Users");
const AuthRouter = require("./routes/Auth");
const CartRouter = require("./routes/Carts");
const OrderRouter = require("./routes/Orders");
const { User } = require("./model/User");

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY ;

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(cookiParser());
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

// session setup
server.use(
  session({
    secret: "secret hai",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));

server.use(express.json());
server.use("/products", isAuth(), ProductsRouter.router);
server.use("/categories",isAuth(), CategoriesRouter.router);
server.use("/brands",isAuth(), BrandsRouter.router);
server.use("/users",isAuth(), UsersRouter.router);
server.use("/auth", AuthRouter.router);
server.use("/cart",isAuth(), CartRouter.router);
server.use("/orders",isAuth(), OrderRouter.router);

// passport setup

passport.use('local',
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const hashPassword = crypto.pbkdf2Sync(
        password,
        user.salt,
        1000,
        32,
        "sha256"
        );
        
      if (!crypto.timingSafeEqual(hashPassword, user.password)) {
        console.log("Incorrect password");
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("Correct password");
      const token = jwt.sign(sanitiseUser(user), SECRET_KEY);
      console.log("token :",token)
      return done(null, sanitiseUser(user));
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
'jwt',
  new JwtStrategy(opts,async function (jwt_payload, done) {
    console.log("JWT Payload :", jwt_payload);
    try {
      const user =await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  })
);

// create session id at server
passport.serializeUser(function (user, done) {
  done(null, sanitiseUser(user));
});
//gives data from session id
passport.deserializeUser(function (data, done) {
  console.log("DE-serializeUser called:", data);
  done(null, data);
});

// Database connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");
}

server.listen(8080, () => {
  console.log("Server is running...");
});
