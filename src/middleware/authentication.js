const jwt = require("jsonwebtoken")

let auth= async function (req, res, next) {try{
  let token = req.headers["x-Auth-token"];
  if (!token) {

    token = req.headers["x-auth-token"];
  }
  if (!token) {

    return res.staus(400).send({ status: false, Msg: "Token must be present" })
  }}
  catch(err){res.status(500).send({msg:"server error",Error:err.message})}
  next()
}
const authorise = function(req, res, next) {try{
  let token=  req.headers["x-Auth-token"];
  if (!token) {

    token = req.headers["x-auth-token"];
  }
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken) {
    return res.status(400).send({ status: false, Msg: "Token is Invalid" })}
    
       let findUserId = decodedToken.userId 
    let checkUser = req.params.userId
    if (checkUser !== findUserId) 
    return res.status(400).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
   }catch(err){res.status(500).send({msg:"server error",error:err.message})}
    next()
  }
// midw
module.exports.auth = auth

module.exports.authorise=authorise
// done with try catch and status codes
