const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    authorname: {
        type: String,
        required: true
    }
})

const Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles