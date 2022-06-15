const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid=require("../middleware/authentication")


router.post("/users", userController.createUser  )

router.post("/login", userController.userLogin)

//The userId is sent by front end
router.get("/users/:userId", mid.mid1,userController.getUserDetails)

router.put("/users/:userId",mid.mid1,userController.updateUser)
router.delete("/users/:userId",mid.mid1,userController.deleteUser)
module.exports = router;