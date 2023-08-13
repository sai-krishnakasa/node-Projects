const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/authRouter');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://user:test1234@mydb.r7wjpqq.mongodb.net/node-auth";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {app.listen(8000),console.log('DB Connected')})
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => {
    // render the view with the data and no error
    res.render('smoothies',{"error":null});
});
app.use(routes);