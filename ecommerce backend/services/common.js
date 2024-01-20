const passport = require("passport");
const nodemailer = require("nodemailer");


exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt')
  };

exports.sanitiseUser=(user)=>{
    return {id:user.id,role:user.role};
}

exports.cookieExtractor = (req)=>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies['jwt'];
    }
    return token;
}

//nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "durgesh7840963569@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
});

//email sending
exports.sendMail= async({to , subject , text , html})=> {
    const info = await transporter.sendMail({
      from: '"E-Shop 🛒" <Eshoporders@gmail.com>',
      to , subject , text , html
    });
    return info;
};