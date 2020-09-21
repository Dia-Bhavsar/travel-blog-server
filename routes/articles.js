const express = require('express');
const router = express.Router();
const Articles = require('../models/articles');
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

// Get all Articles
router.get('/articles', (req, res) => {
    if(req.query.id){
        Articles.findById(req.query.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
    }
    else{
        Articles.find()
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
    }

})

// create new Articles
router.post('/add', (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        image: req.body.image,
        authorname: req.body.authorname
    })
    newArticle
        .save()
        .then(() => res.json('The New Article posted Successfuly..!!!'))
        .catch(err => res.status(400).json(err))
})

// get Article by id 
router.get('/:id', (req, res) => {
    console.log("req", req.query)
    Articles.findById(req.query.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// Update The Article by ID
router.put('/:id', (req, res) => {
    console.log("Update Req", req.query.id)
    Articles.findByIdAndUpdate(req.query.id).exec()
        .then(article => {
            article.title = req.body.title,
                article.article = req.body.article,
                article.image = req.body.image,
                article.authorname = req.body.authorname

            article
                .save()
                .then(() => res.json("Article Updated Successfully...!!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))

})

// Delete The Article By ID

router.delete('/:id', (req, res) => {
    Articles.findByIdAndDelete(req.query.id).exec()
        .then(() => res.json("Article is Deleted Successfuly"))
        .catch(err => res.status(400).json(`Error: ${err}`))
}
)

module.exports = router