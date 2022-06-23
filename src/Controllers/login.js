const authorModel=require("../Models/authorModel")
const jwt=require("jsonwebtoken")
const authorLogin = async function (req, res) {
  try {
    authorName = req.body.email
    authorPassword = req.body.password
    let authorDetails = await authorModel.findOne({
      email: authorName,
      password: authorPassword,
    });
    if (!authorDetails) {
      res
        .status(400)
        .send({
          status: false,
          msg: "authorName or authorpassword is invalid",
        });
    }
    let token = jwt.sign(
      {
        authorId: authorDetails._id.toString(),
      },
      "blogProject"
    );
    res.setHeader("x-api-key", token);
    res.status(201).send({ status: true, token: token });
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};
module.exports.authorLogin = authorLogin;
