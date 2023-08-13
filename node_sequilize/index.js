const express = require("express")
const db = require('./models/index')
const app = express();

const { User } = require('./models');
// const User = db.User;
console.log(User);

db.sequelize.sync().then((req) => {
    app.listen(8000, () => {
        console.log("server running");
    });
});

app.get('/select', (req, res) => {
    User.findAll().then((users) => {
        res.send(users.map(user => user.toJSON()));
    })
        .catch((err) => {
            console.log(err);
        })
})

// Update a user
// User.update({
//     firstName: "Jane"
// }, {
//     where: {
//         id: 1
//     }
// }).then(() => {
//     console.log("User updated");
// });

app.get('/insert', (req, res) => {
    User.create({
        firstName: "kasa",
        age: 10
    }).then((rows) =>
        res.send("Inserted")
    )
        .catch((err) => {
            console.log(err);
        })
})

app.get('/delete', (req, res) => {
    User.destroy({ where: { id: 10 } });
    res.send("deleted");
})





