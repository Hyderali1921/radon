const authenticate=async function (req, res,next) {
    try{ 
        authorName = req.body.email
        authorPassword = req.body.password
    
  
    let authorDetails = await authorModel.findOne({ email: authorName, password: authorPassword })
    if (! authorDetails) {
      res.status(400).send({ status: false, MSg: "authorName or authorPassword is invalid" })
    } next()}
    catch(err){res.status(500).send({ msg: "Error", error: err.message })}}

const authorise = function(req, res, next) {
    try{

    
    let token = req.headers["x-api-key"];
    if (!token) {

        token = req.headers["X-Api-Key"];
      }
    let decodedToken = jwt.verify(token, "blogProject");
    let findAuthorId = decodedToken.authorId
    let checkAuthor = req.params.authorId
    if (checkAuthor !== findAuthorId) 
    return res.status(400).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
    next()
}
catch(err){ res.status(500).send({ msg: "Error", error: err.message })}}

module.exports.authorise=authorise
module.exports.authenticate=authenticate
  