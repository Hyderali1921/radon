const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");
const blogController = require("../Controllers/blogcontroller");
const middleware=require("../middleware/mw")
const login=require("../Controllers/login")

router.post("/authors", authorController.createAuthor);

router.post("/blogs", blogController.createBlogDoc);
router.get("/blogs",blogController.blogs)
router.put("/blogPut/:blogId",blogController.blogPut);
router.delete("/blogDel/:blogId",blogController.blogDeletById)
router.delete("/blogDelByQuery",middleware.authenticate,middleware.authorise,blogController.blogDeletByParams)

router.post("/login",login.authorLogin)
module.exports = router;
// authenticate,authorise