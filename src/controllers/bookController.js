const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publishersModel")
const createBook = async function(req, res) {
    const { author_id, publihsher_id } = req.body
    if (!author_id || publihsher_id) {
        return res.send({
            msg: "an error message that authorId & publisherId details are required"
        })
    } else {

        const authorId = await authorModel.findById(author_id)
        const publisherId = await publisherModel.findById(publihsher_id)
        if (!authorId && !publisherId) {
            return res.send({ msg: "not found" })
        } else {
            const bookCreated = await bookModel.create(req.body)
            res.send({ data: bookCreated, status: true })
        }


    }
}
const getBooksData = async function(req, res) {
    let books = await bookModel.find().populate('author_id').populate('publisher_id')

    res.send({ data: books })
}

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }

module.exports.createBook = createBook

module.exports.getBooksData = getBooksData
    // module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails