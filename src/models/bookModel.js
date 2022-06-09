const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId //mixed type 

const bookSchema = new mongoose.Schema({
    name: String,
    author_id: {
        type: ObjectId,
        ref: "newAuthor"
    },
    price: Number,
    ratings: Number,
    publisher_id: {
        type: ObjectId,
        ref: "Publisher"
    }


}, { timestamps: true });


module.exports = mongoose.model('LibraryBook', bookSchema)
    //