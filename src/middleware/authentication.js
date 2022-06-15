const jwt = require("jsonwebtoken")

let auth= async function (req, res, next) {
  let token = req.headers["x-Auth-token"];
  if (!token) {

    token = req.headers["x-auth-token"];
  }
  if (!token) {

    return res.send({ status: false, Msg: "Token must be present" })
  }
  next()
}
const authorise = function(req, res, next) {
  let token=  req.headers["x-Auth-token"];
  if (!token) {

    token = req.headers["x-auth-token"];
  }
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken) {
    return res.send({ status: false, Msg: "Token is Invalid" })}
    
       let findUserId = decodedToken.userId 
    let checkUser = req.params.userId
    if (checkUser !== findUserId) 
    return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    next()
  }

module.exports.auth = auth

module.exports.authorise=authorise