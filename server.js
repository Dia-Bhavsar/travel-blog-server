const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
// import routes
const articleRoutes = require('./routes/articles')

const app = express()

// connect DB
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));


app.use(morgan('dev'));
app.use(cors());
// app.use(express.json())
app.use(bodyParser.json())

 // middleware 
app.use('/api', articleRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`API is running on ${port} - ${process.env.NODE_ENV}`)
})