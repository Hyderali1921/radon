const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid=require("../middleware/authentication")
// const midware2=require("../middleware/authourisation")

router.post("/users", userController.createUser  )

router.post("/login", userController.userLogin)

//The userId is sent by front end
router.get("/users/:userId", mid.auth,mid.authorise,userController.getUserDetails)
// 
router.put("/users/:userId", mid.auth,mid.authorise,userController.updateUser)
router.delete("/users/:userId", mid.auth,mid.authorise,userController.deleteUser)
router.post("/users/:userId/posts", mid.auth,mid.authorise,userController.postMessage)
module.exports = router;