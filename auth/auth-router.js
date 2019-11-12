const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');


// CREATE
router.post('/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 12)
    credentials.password = hash;

    Users.addUser(credentials)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('./login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Server Error'})
    })
})


module.exports = router;