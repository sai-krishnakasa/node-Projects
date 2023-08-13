const cookieParser = require('cookie-parser')
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const contactRoutes = require('./routers/ContactRoutes')
const authRoutes = require('./routers/authRoutes')
require('dotenv').config();
const errorHandler = require("./middleware/errorHandler")
const authMiddleware = require("./middleware/AuthMiddleware")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
mongoose.connect(process.env.dbURI).then(() => {
    console.log("Db Connection Successful")
}).then(app.listen(process.env.PORT || 8000, () => {

    console.log(`Server is Running on ${process.env.PORT || 8000}`)
}))



app.use('/contacts/', authMiddleware, contactRoutes);
app.use('/auth/', authRoutes);
app.use(errorHandler)



