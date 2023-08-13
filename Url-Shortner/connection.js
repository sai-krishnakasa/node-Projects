const mongoose = require('mongoose');
const Url = require('./models/url')
const shortid = require('shortid')

const dbURI = "mongodb+srv://user:test1234@mydb.r7wjpqq.mongodb.net/url";
const econn = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
    .then((result) => { console.log('DB Connected') })
    .catch((err) => console.log(err));

// mongoose.connect(uri, );

// (function () {
//     const shortUrl = shortid.generate();
//     const obj = new Url({
//         "long_url": "https://abdc.edu.in/7889993/",
//         "short_url": `https://hexa-shorten.in/${shortUrl}`
//     })
//     obj.save()
//         .then(result => {
//             console.log('Document created:', result);
//         })
//         .catch(error => {
//             console.error('Error creating document:', error);
//         });

// })();

module.exports = econn;



