const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitiseUser, sendMail } = require("../services/common");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.createUser = async (req, res) => {
  try {
    const olduser = await User.findOne({ email: req.body.email });
    if (olduser && olduser.role) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const salt = crypto.randomBytes(16);
      const hash = crypto.pbkdf2Sync(
        req.body.password,
        salt,
        1000,
        32,
        "sha256"
      );
      const user = new User({ ...req.body, salt, password: hash });
      const result = await user.save();

      req.login(sanitiseUser(result), function (err) {
        if (err) {
          res.status(400).json(err);
        } else {
          const token = jwt.sign(sanitiseUser(result), process.env.JWT_SECRET_KEY);
          res
            .cookie("jwt", token, {
              expires: new Date(Date.now() + 60 * 60 * 1000),
              httpOnly: true,
            })
            .status(200)
            .json(sanitiseUser(result));
        }
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Try again !!" });
  }
};



exports.loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
    })
    .status(200)
    .json({ id: user.id, role: user.role });
};

exports.logout = async (req, res) => {
  try{
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true,secure: true  }).status(200).json({ message: "Logout successfully" });
    console.log("Logout successfully")
  }
  catch(err){
    res.status(400).json({ message: "Try again !!" });
  }
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.status(200).json(sanitiseUser(req.user));
  } else {
    res.sendStatus(400);
  }
};
exports.resetPasswordRequest = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = token;
      await user.save();
      const resetPageLink = `https://durgesheshop.vercel.app/reset-password?token=${token}&email=${email}`;
      const subject = "Reset Password Request";
      const text = `This is the reset Password Request.Please click on the ${resetPageLink} to reset your password`;
      const html = `This is the reset Password Request. Please click <a href="${resetPageLink}">here</a> to reset password.`;
      const response = await sendMail({to:email,subject:subject, text:text, html:html });
      console.log("nodemailer response :",response);
      res.status(200).json(response);
    } else {
      res.status(400).json({ message:"User Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Try again !!" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token, email, password } = req.body;
    const user = await User.findOne({
      email: email,
      resetPasswordToken: token,
    });
    if (user) {
      const salt = crypto.randomBytes(16);
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 32, "sha256");
      user.salt = salt;
      user.password = hash;
      user.resetPasswordToken = "";
      await user.save();

      const link = `https://durgesheshop.vercel.app/login`;
      const subject = "Password reset successfully";
      const text = `You have successfully reset your password .Plese Login  <a href=${link}> here </a> to continue`;
      const html = `You have successfully reset your password .Plese Login  <a href=${link}> here </a> to continue`;

      const response = sendMail({to:email,subject:subject, text:text, html:html });
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  }
  catch (err) {
    res.status(400).json({ message: "Try again !!" });
  }
};