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
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    author: {
        type: String,
        required: true,
        minLength: 3
    },
    description:{
        type:String,
        minLength: 3
    },
    category:{
        type:"String",
        enum: ["fiction", "non-fiction","comics", "Mafia","moving","inspirational","family", "betrayal"],
        default: "fiction"
    },
    purchaseCount: {
        type: Number,
        default: 0
    },
    imageUrl: String,
    tags: Array
})

const Book = mongoose.model('book',bookSchema);
module.exports = Book;