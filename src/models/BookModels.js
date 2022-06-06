const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    bookName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["spiritual", "comic", "horror", "Biography", "action and romance"]
    },
    year: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema)