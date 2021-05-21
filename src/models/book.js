const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const bookSchema = new Schema({
//     title: String,
//     author: String,
//     description:String,
//     category:String,
//     purchaseCount: Number,
//     imageUrl: String,
//     tags: Array
// })

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description:String,
    category:String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array
})

const Book = mongoose.model('book',bookSchema);
module.exports = Book;