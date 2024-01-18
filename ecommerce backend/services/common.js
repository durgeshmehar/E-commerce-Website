const passport = require("passport");

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
    //token admin
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTU5NjRiMmM1MTIzNmNlYjE5NzVkZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTU4MzMzMX0.kNKyZ0gTI55XWF6t9NzztPJSeawzJrVovXZ7Rj_Jn9E"
    return token;
}