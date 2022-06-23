const authorModel=require("../Models/authorModel")
const jwt=require("jsonwebtoken")
const authenticate=async function (req, res,next) {
    try{ 
  let token = req.headers["x-api-key"];
  if (!token) {

    token = req.headers["X-Api-Key"];
  }
  if (!token) {

    return res.send({ status: false, Msg: "Token must be present" })
  }
  console.log(token)
  let decodedToken = jwt.verify(token, "blogProject");
  if (!decodedToken) {
    return res.send({ status: false, Msg: "Token is Invalid" })
  }console.log(typeof decodedToken) 
  }
  catch(err){res.status(500).send({ msg: "Error", error: err.message })}
  next()
}
const authorise = function(req, res, next) {
    try{    
    let token = req.headers["x-api-key"];
    if (!token) {

        token = req.headers["X-Api-Key"];
      }
    let decodedToken = jwt.verify(token,"blogProject");
    let findAuthorId = decodedToken.authorId
    let checkAuthor = req.query.authorId
    if (checkAuthor !== findAuthorId) 
    return res.status(400).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    next()
}
catch(err){ res.status(500).send({ msg: "Error", error: err.message })}}

module.exports.authorise=authorise
module.exports.authenticate=authenticate
  