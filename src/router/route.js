const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");
const blogController = require("../Controllers/blogcontroller");
const middleware=require("../middleware/mw")
const login=require("../Controllers/login")

router.post("/authors", authorController.createAuthor);

router.post("/blogs",Authenticate,middleware.authorise, blogController.createBlogDoc);
router.get("/blogs",authenticate,authorise,blogController.blogs)
router.get("/login",authenticate,authorise,login.authorLogin)
module.exports = router;
