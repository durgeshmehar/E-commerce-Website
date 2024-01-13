const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");

const ProductsRouter = require("./routes/Products");
const CategoriesRouter = require("./routes/Categories");
const BrandsRouter = require("./routes/Brands");
const UsersRouter = require("./routes/Users");
const AuthRouter = require("./routes/Auth");
const CartRouter = require("./routes/Carts");
const OrderRouter = require("./routes/Orders");
const { User } = require("./model/User");

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
server.use("/products", isAuth,ProductsRouter.router);
server.use("/categories", CategoriesRouter.router);
server.use("/brands", BrandsRouter.router);
server.use("/users", UsersRouter.router);
server.use("/auth", AuthRouter.router);
server.use("/cart", CartRouter.router);
server.use("/orders", OrderRouter.router);

// passport setup

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const hashPassword= crypto.pbkdf2Sync(user.password,user.salt,1000,32,'sha256');

      if (!crypto.timingSafeEqual(hashPassword,password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
// create session id at server
passport.serializeUser(function(user, done) {
  console.log("Serialize User :",user);
  done(null, {id:user.id,role:user.role})
});
//gives data from session id
passport.deserializeUser(function(data, done) {
  done(null, data);
})


// Database connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");
}

function isAuth(req,res,done){
  if(req.user){
    done();
  }else{
    res.status(404).json({message:"Not Authenticated"})
  }
}

server.listen(8080, () => {
  console.log("Server is running...");
});
