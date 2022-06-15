const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel.js");

const createUser = async function (req, res) {
  let userData = req.body
  let savedData = await UserModel.create(userData)
  res.send({ msg: savedData })
}

const userLogin = async function (req, res) {
  userName = req.body.emailId
  userPassword = req.body.password
  let userDetails = await UserModel.findOne({ emaliId: userName, password: userPassword })
  if (!userDetails) {
    res.send({ status: false, MSg: "userName or password is invalid" })
  }
  let token = jwt.sign(
    {
      userId: userDetails._id.toString(),
      batch: "Radon",
      organisation: "FunctionUp,"
    }, "functionup-radon");
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token })
};

const getUserDetails = async function (req, res) {
  
  // If a token is present then decode the token with verify function
  let userId = req.params.userId
  let userDetails = await UserModel.findById(userId)
  if (!userDetails) {
    return res.send({ status: false, Msg: "NO such user exists" })
  }
  res.send({ status: true, data: userDetails })


};


const updateUser = async function (req, res) {
  let userId = req.params.userId
  let user = await UserModel.findById(userId)
  if (!user) {
   return res.send({ Msg: "No such user exists" })
  }
  let userData = req.body
  // let updateUser = await UserModel.findOneAndUpdate({ _id: userId },userData}, {new: true})
  let updatedUser = await UserModel.findOneAndUpdate({_id: userId,},userData);
  res.send({ status: true, data: updatedUser })
};


const deleteUser = async function (req, res) {
  let userId = req.params.userId
  let user = await UserModel.findById(userId)
  if (!user) {
   return res.send({ Msg: "No such user exists" })
  }
  let userData = req.body
  let deleteUser = await UserModel.findOneAndUpdate({ _id: userId }, userData, {new: true})
  res.send({ status:true, data: deleteUser })
};



const postMessage = async function (req, res) {
  let message = req.body.message
  
  let user = await UserModel.findById(req.params.userId)
  if(!user) return res.send({status: false, msg: 'No such user exists'})
  
  let updatedPosts = user.posts
  //add the message to user's posts
  updatedPosts.push(message)
  let updatedUser = await UserModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

  //return the updated user document
  return res.send({status: true, data: updatedUser})
}
module.exports.postMessage = postMessage
module.exports.createUser = createUser
module.exports.userLogin = userLogin
module.exports.getUserDetails = getUserDetails
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser