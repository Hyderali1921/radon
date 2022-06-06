const BookModels = require("../models/BookModels")



const createBook = async function(req, res) {
    let data = req.body
    let savedData = await BookModels.create(data)
    res.send({ msg: savedData })
}

const showBookData = async function(req, res) {
    let allUsers = await BookModels.find()
    res.send({ msg: allUsers })
}

module.exports.createBook = createBook
module.exports.showBookData = showBookData