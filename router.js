const express = require('express');

const router = express.Router(); //create router instance
let users = [
    {id:1, name:'Ben', age:20},
    {id:2, name:'John',age:30},
    {id:3, name:'Chris',age:40},
    {id:4, name:'Jane', age:60},
];

//GET fetch all users
router.get('/users', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'All users fetched successfully',
        data: users,
    });
})
//POST create a new user
router.post('/users', (req, res) => {
    const { name, age } = req.body;
    if (!name ||!age) {
        return res.status(400).json({
            status: 'error',
            message: 'Name and age are required',
        });
    }
    const newUser = { id: users.length + 1, name, age };
    users.push(newUser);
    res.status(201).json({
        status:'success',
        message: 'User created successfully',
        data: newUser,
    });
})
//DELETE delete all user
router.delete('/users', (req, res) => {
    users = [];
    res.status(204).return;
})
//DELETE delete a single user by id
router.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found',
        });
    }
    users.splice(userIndex, 1);
    res.status(204).return;
})

module.exports = router;