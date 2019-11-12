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

module.exports = router;