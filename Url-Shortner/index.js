
const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/url');
const conn = require('./connection')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const shortid = require('shortid');

app = express();

app.use(express.static('public'));

app.listen(8000, () => console.log("Server Started...."))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    Url.find().then((rows) => {
        console.log(rows);
        return res.render('shorten', { "urls": rows })
    })
        .catch((err) => console.log(err));
})

app.get('/shorten', (req, res) => {
    Url.find().then((rows) => {
        console.log(rows);
        return res.render('shorten', { "urls": rows })
    })
        .catch((err) => console.log(err));
})

app.get('/search/:url', (req, res) => {
    const short_url = decodeURIComponent(req.params.url);
    console.log(short_url)
    Url.findOne({ short_url: short_url }).then((rows) => {

        res.redirect(rows.long_url);
    }).catch((err) => {
        console.log(err);
        res.send(err)
    })
})


app.post('/shorten', async (req, res) => {
    // const id = shortid.generate();
    // console.log(req.body)
    // console.log(`https://hexa-shorten.in/${id}`)

    const url = new Url({
        long_url: req.body.url,
        // .pre('save') was implemented at schema level which adds the 
        //  generated short_url before save executes
    })
    url.save();
    const urls = await Url.find();
    console.log(urls)
    res.render('shorten', { "urls": urls });

});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    Url.findByIdAndDelete(id)
        .then((result) => {
            console.log("Url Deleted Successfully ", JSON.stringify(result));
            res.redirect('/')
        })
        .catch((err) => console.log(err));
})





