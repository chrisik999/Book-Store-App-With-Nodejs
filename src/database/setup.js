const mongoose = require('mongoose');
const dbUri = "mongodb://localhost:27017/book-store";

module.exports = function () {
    mongoose.connect(dbUri,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    },(err) => {
        if(err) {
            console.log({err});
        } else {
            console.log("mongodb has been connected");
        }
    })
}