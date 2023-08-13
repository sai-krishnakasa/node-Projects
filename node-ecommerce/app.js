const express = require('express')
const winston = require('winston')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/user')
const Product = require('./models/product')
const Order = require('./models/orders')
const Like = require('./models/likes')
const Category = require('./models/category')
const Comment = require('./models/comments')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/authRouter')
const homeRouter = require('./router/homeRouter')
const categoryRouter = require('./router/categoryRouter')
const bcrypt = require('bcrypt');
const requireAuth = require('./middlewares/authMiddleware')
const multer = require('multer');
const ejs = require('ejs')
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.static("uploads/product_pics"));
app.use(express.static("uploads/profile_pics"));
app.set('view engine', 'ejs');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};


const profileUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/profile_pics');
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split('/')[1];
            const file_name = file.originalname
            cb(null, `${file_name.split(" ").join("")}-${req.user._id}.${ext}`);
        },
    }),
    fileFilter,
});

const productUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log(file)
            console.log(file)
            console.log()
            cb(null, './uploads/product_pics');
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split('/')[1];
            const file_name = file.originalname
            cb(null, `${file_name.split(" ").join("")}-${req.user._id}.${ext}`);
        },
    }),
    fileFilter,
});

const router = express.Router()
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});



const dbURI = "mongodb://127.0.0.1:27017/E-commerce";
const econn = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
    .then((result) => {
        console.log('DB Connected');
    }).then(app.listen(process.env.PORT || 5000, async () => {
        logger.info("Server Started....")
        // const user = await User.findOne({ "username": "Akshay" })
        // logger.info(await bcrypt.compare("Password", user?.password))
        // const new_user = new User({
        //     username: "akashuh",
        //     email: "saikrisshnakasa123@gmail",
        //     password: "password",
        //     phone: 7367744329
        // })
        // await new_user.save();

    }))
    .catch((err) => console.log(err));



router.get('/create-category', async (req, res) => {
    const cat = new Category({
        name: "Beauty and Fashion"
    })
    cat.save().then(() => {
        res.write("category Created Successfully");
        res.end()
    }).catch((err) => {
        console.log(err);
        res.send("Failed to create category")
    });
})
router.post('/create-product', productUpload.single('image'), async (req, res) => {
    const cat = await Category.findOne({ name: "Beauty and Fashion" })
    console.log(cat);
    console.log(req.file)
    const image_path = req.file.path.split("//uploads");
    const product = new Product({
        name: "Face Washhuu",
        category: cat.id,
        price: 140,
        description: `Lorem ipsum dollar la sche di ga fanvch kkksdksnfkdk f dn n svn fn v df vds jc 
        ds jds v d ds v sdvb s vb nkd cs v fn vn fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        fvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv`,
        quantity: 20,
        image: image_path
    })
    product.save().then(() => {
        res.write("Product Created Successfully");
        // res.write(this.category);
        res.end()
    }).catch((err) => {
        console.log(err);
        res.send("Failed to create product")
    });
})
router.get('/create-order', async (req, res) => {
    const product = await Product.findOne({ name: "Face Washhuu" })
    const user = await User.findOne({ username: "Akshay" })
    const order = new Order({
        product: product.id,
        user: user.id,
        quantity: 5
    })
    order.user = user._id;
    await order.save();
    user.orders.push(order._id);
    await user.save()
    console.log(await order.populate("user"));
    // res.send(`order Created Successfullly ${order.id} , ${order.user}`)
    res.end();
})

console.log(productUpload)

app.use('/auth', authRouter(profileUpload));
app.use('/', requireAuth, homeRouter(productUpload, profileUpload));
app.use('/', requireAuth, categoryRouter);
app.use(router);

