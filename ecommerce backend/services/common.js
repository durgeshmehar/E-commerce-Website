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
    //fix token for testing (durgesh784096)
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTU4NjcwYzg0NTIwZWRlMmM1NWMxZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA1MzQ2NjcyfQ.A-5QT_Loss4L-j1Jeed7Fqr4VSlQuuJmLpzkb-xg1Q4";

    //token (temp9@gmail.com)
    // token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTU4NmY5ZWU4YWQxMDQ0ZWEyODA4YyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA1MzQ2ODA5fQ.mmqZatBu0FneCuBPXVmYVowVVuBMWUYCYr2LAxI_Am8"

    //token admin
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTU5NjRiMmM1MTIzNmNlYjE5NzVkZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA1MzUwNzMxfQ.qI47wwmr1iuObD3CFxdcAA7T04HkLfW_GKxsQHnUxRc"


    return token;
}