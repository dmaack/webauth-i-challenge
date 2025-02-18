const router = require('express').Router();

const Users = require('./user-model');
const requireAuth = require('../auth/auth-middleware');

router.get('/', requireAuth, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send(err)
        })
})

// router.get('/', (req, res) => {
//     Users.getUsers()
//     .then(users => {
//         res.status(200).json(users)
//     })
//     .catch(err => {
//         res.status(500).json({error: 'Server Error'})
//     })
// })

module.exports = router;