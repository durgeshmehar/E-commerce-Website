require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
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
const { Order } = require("./model/Order");

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

//webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET;

server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        const order = await Order.findById(
          paymentIntentSucceeded.metadata.orderId
        );
        order.paymentStatus = "received";
        await order.save();
        console.log("PaymentIntent :", { paymentIntentSucceeded });
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();

  }
);

// server.use(express.raw({type: 'application/json'}))
server.use(express.json());
server.use(express.static(path.resolve(__dirname, 'build')));
server.use(cookiParser());
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

// session setup
server.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));

server.use("/products", isAuth(), ProductsRouter.router);
server.use("/categories", isAuth(), CategoriesRouter.router);
server.use("/brands", isAuth(), BrandsRouter.router);
server.use("/users", isAuth(), UsersRouter.router);
server.use("/auth", AuthRouter.router);
server.use("/cart", isAuth(), CartRouter.router);
server.use("/orders", isAuth(), OrderRouter.router);


//build file routing
server.get("*", (req,res) =>
  res.sendFile(path.resolve(__dirname, "build", "index.html"))
);

// passport setup

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email});
        if (user===null) {
         return done(null,false,{message:"User not found"});
        }
        const hashPassword = crypto.pbkdf2Sync(
          password,
          user.salt,
          1000,
          32,
          "sha256"
        );

        if (!crypto.timingSafeEqual(hashPassword, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        const token = jwt.sign(sanitiseUser(user), process.env.JWT_SECRET_KEY);
        return done(null, { ...sanitiseUser(user), token });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
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
  done(null, data);
});

//payments gateway
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET);

server.post("/create-payment-intent", async (req, res) => {
  const { items, orderId } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: items.totalAmount * 100,
    currency: "inr",
    description: "This payment about to test my product checkout",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



// Database connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

server.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT} ...`);
});
