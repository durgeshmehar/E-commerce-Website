const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitiseUser, sendMail } = require("../services/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 32, "sha256");
    const user = new User({ ...req.body, salt, password: hash });
    const result = await user.save();

    req.login(sanitiseUser(result), function (err) {
      if (err) {
        res.status(400).json(err);
      } else {
        const token = jwt.sign(sanitiseUser(result), SECRET_KEY);
        res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            httpOnly: true,
          })
          .status(200)
          .json(sanitiseUser(result));
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
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

      const link = `http://localhost:5173/login`;
      const subject = "Password reset successfully";
      const text = `You have successfully reset your password .Plese Login  <a href=${link}> here </a> to continue`;
      const html = `You have successfully reset your password .Plese Login  <a href=${link}> here </a> to continue`;

      if (email) {
        
        const response = sendMail({ to: req.body.email, subject, text, html });
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "Login First" });
      }
    } else {
      res.status(400).json("Invalid User");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
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
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.status(200).json(sanitiseUser(req.user));
  } else {
    res.status(400).json("Login First");
  }
};
exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    await user.save();
    const resetPageLink = `http://localhost:5173/reset-password?token=${token}&email=${email}`;
    const subject = "Reset Password Request";
    const text = `This is the reset Password Request.Please click on the ${resetPageLink} to reset your password`;
    const html = `This is the reset Password Request. Please click <a href="${resetPageLink}">here</a> to reset password.`;

    if (email) {
      
      const response = sendMail({ to: req.body.email, subject, text, html });
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "Login First" });
    }
  } else {
    res.status(400).json({ message: "Server Error" });
  }
};
