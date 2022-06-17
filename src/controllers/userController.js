const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel.js");

const createUser = async function (req, res) {
 try{

  let userData = req.body
  if(Object.keys(userData).length != 0){
  let savedData = await UserModel.create(userData)
  res.status(201).send({ msg: savedData })
}
else res.status(400).send({ msg: "BAD REQUEST"})
}
catch (err) {
  
  res.status(500).send({ msg: "Error", error: err.message })
}}


const userLogin = async function (req, res) {
  try{userName = req.body.emailId
  userPassword = req.body.password
  

  let userDetails = await UserModel.findOne({ emaliId: userName, password: userPassword })
  if (!userDetails) {
    res.status(400).send({ status: false, MSg: "userName or password is invalid" })
  }
  let token = jwt.sign(
    {
      userId: userDetails._id.toString(),
      batch: "Radon",
      organisation: "FunctionUp,"
    }, "functionup-radon");
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, token: token })
}
catch(err){
  res.status(500).send({ msg: "Error", error: err.message })
}
}


const getUserDetails = async function (req, res) {
  try{
  // If a token is present then decode the token with verify function
  let userId = req.params.userId
  let userDetails = await UserModel.findById(userId)
  if (!userDetails) {
    return res.status(400).send({ status: false, Msg: "NO such user exists" })
  }
  res.status(201).send({ status: true, data: userDetails })

  }catch(err){
    res.status(500).send({msg:"server error",error:err.message})
  }
};


const updateUser = async function (req, res) {
  try{
  let userId = req.params.userId
  let user = await UserModel.findById(userId)
  if (!user) {
   return res.status(400).send({ Msg: "No such user exists,Bad Request" })
  }
  let userData = req.body
  // name must be in string format ...
  // let updateUser = await UserModel.findOneAndUpdate({ _id: userId },userData}, {new: true})
  let updatedUser = await UserModel.findOneAndUpdate({_id: userId,},userData);
  res.status(201).send({ status: true, data: updatedUser })
}
catch(err){res.status(500).send({msg:"server error",error:err.message})}
};


const deleteUser = async function (req, res) {
  try{
  let userId = req.params.userId
  let user = await UserModel.findById(userId)
  if (!user) {
   return res.status(400).send({ Msg: "No such user exists" })
  }
  let userData = req.body
  let deleteUser = await UserModel.findOneAndUpdate({ _id: userId }, userData, {new: true})
  res.status(201).send({ status:true, data: deleteUser })
}
catch(err){
  res.status(500).send({msg:"server error",error:err.message})
}
};



const postMessage = async function (req, res) {try{
  
  let message = req.body.message
  
  let user = await UserModel.findById(req.params.userId)
  if(!user) return res.status(400).send({status: false, msg: 'No such user exists'})
  
  let updatedPosts = user.posts
  //add the message to user's posts
  updatedPosts.push(message)
  let updatedUser = await UserModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})
  
  //return the updated user document
  return res.status(201).send({status: true, data: updatedUser})}
  catch(err){res.status(500).send({msg:"server error",error:err.message})}
}




module.exports.postMessage = postMessage
module.exports.createUser = createUser
module.exports.userLogin = userLogin
module.exports.getUserDetails = getUserDetails
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
// /controllerss