const db = require('./models/index')
const { User } = require('./models')

const express = require('express');
const { where, Op } = require('sequelize');
const app = express()
db.sequelize.sync().then((req) => {
    app.listen(8000, () => {
        console.log("server running");
    });
});


app.use(express.json()) // Add a dot here





app.route('/').get(async (req, res) => {
    users = await User.findAll();
    console.log(users)
    return res.send(users.map(user => user.toJSON()))
}).
    post(async (req, res) => {
        console.log(req.body)
        const { firstName, lastName, age, salary } = req.body;
        const user = await User.create({ firstName, lastName, age, salary })
        return res.redirect('/')
    })

app.route('/:id').get((req, res) => {
    const id = req.params.id;
    User.findByPk(id).then((user) => {
        if (user) {
            res.send(user.toJSON())
        }
        else {
            res.send("No User Found")
        }
    }).catch((err) => {
        console.log("NO User Found");
        console.log(err)
        res.send("NO User Found")

    })
})
    .put(async (req, res) => {
        const id = req.params.id;
        let user = User.findByPk(id).then((user) => {
            if (user) {
                user.update(req.body);
                user.save()
                res.send(user.toJSON())
            }
            else {
                res.send("No User Found")
            }
        })

    })
    .delete((req, res) => {
        const id = req.params.id;
        User.findByPk(id).then((user) => {
            if (user != null) {
                user.destroy()
                res.send(user)
            }
            res.send("User Not Found")
        }).catch((err) => {
            console.log(err);
        })
    })


// where: {
//     [Op.or]: {
//         firstName: "kasa",
//         [Op.and]: {
//             salary: 900000,
//         }
//     }
// }
// SELECT "id", "uuid", "firstName", "age", "salary", "createdAt", "updatedAt" FROM "Users" 
// AS "User" WHERE (("User"."salary" = 900000) OR "User"."firstName" = 'kasa');

// Sure, here are some questions:

// 1. Create a new user in the `User` table with a given first name, age, and salary.
// 2. Retrieve all users from the `User` table and sort them by age in ascending order.
// 3. Retrieve the user with the highest salary from the `User` table.
// 4. Update the salary of a specific user in the `User` table.
// 5. Delete a specific user from the `User` table.
// 6. Retrieve all users with a salary greater than a certain amount.
// 7. Retrieve the total number of users in the `User` table.
// 8. Retrieve the average salary of all users in the `User` table.
// 9. Retrieve all users with a given first name.
// 10. Retrieve all users with a given age range.

// User.findAll({
//     order: [['age', 'DESC']]
// }).then((users) => {
//     users.forEach(user => {
//         console.log(user.firstName)
//         console.log(user.age)
//         // console.log(user.dataValues.Total_Salary);
//         // console.log(user.salary);
//     });
// })

User.findAll({
    attributes: { exclude: ["id", "uuid"] },
    where: {
        salary: {
            [Op.gte]: 10
        }
    }
}).then((users) => users.forEach(element => { console.log(element.dataValues.salary), console.log(element.dataValues.firstName) }));

// User.findOne({
//     attributes: ['firstName', [db.sequelize.fn('max', db.sequelize.col('salary')), 'max_salary']],
//     group: ['firstName']
// }).then((user) => {
//     console.log(user.firstName)
//     console.log(user.dataValues.max_salary)
// })

User.findAll({
    attributes: [
        [db.sequelize.fn('avg', db.sequelize.col('salary')), 'avg_sal']
    ],

}).then((res) => {
    res.forEach((re) => console.log(re.dataValues.avg_sal))
});







