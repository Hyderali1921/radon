const newBookModel = require("../model/newBookModel")
const authorModel = require("../model/authormodel")

const newBook = async function(req, res) {
    let data = req.body
    let saveData = await newBookModel.create(data)
    res.send({ msg: saveData })
}
const newAuthor = async function(req, res) {
    let datas = req.body
    let authorData = await authorModel.create(datas)
    res.send({ msg: authorData })
}
const booksByChetan = async function(req, res) {
        let id_data = await authorModel.find({ author_name: "Chetan Bhagat" }).select("author_id")
        let booklist = await newBookModel.find({ author_id: id_data[0].author_id })
        res.send({ msg: booklist })
    }
    // const authorOfBook = async function(req, res) {
    //     let book = await updateBookModel.findOneAndUpdate({ name: "two states" }, { $set: { price: 100 } }, { new: true })
    //     let author = await authorModel.find({
    //         author_id: book.author_id
    //     }).select("author_name")
    //     let prices = book.price
    //     res.send({ msg: author, prices })
const authorOfBook = async function(req, res) {
    let book = await newBookModel.findOneAndUpdate({ name: "Two states" }, { $set: { price: 100 } }, { new: true })
    let author = await authorModel.find({ author_id: book.author_id }).select("author_name");
    let cost = book.price
    res.send({ msg: author, cost })

}
const costList = async function(req,res){
    const bookData = await ookModel.find({price: {$gte: 50, $lte: 100}}).select({author_id:1, _id:0 })
    const id = bookData.map(inp => inp.author_id)

    let temp = []

    for(let i=0;i<id.length;i++){
        let x = id[i]
        const author = await authorModel.find({ author_id:x}).select({author_name:1, _id:0})
        temp.push(author)
    }
    const author_name = temp.flat()
    res.send({msg: author_name})
}

module.exports.costList = costList
module.exports.newBook = newBook
module.exports.newAuthor = newAuthor
module.exports.booksByChetan = booksByChetan
module.exports.authorOfBook = authorOfBook
