const express = require('express');
const router = express.Router();
const BookControllers = require("../controllers/BookControllers")
const UserControllers = require("../controllers/userController")



router.post('/createBook', BookControllers.createBook)

router.get('/showBookData', BookControllers.showBookData)





// router.get("/test-me", function(req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser)

// router.get("/getUsersData", UserController.getUsersData)

module.exports = router;