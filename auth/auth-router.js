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
            req.session.username = saved.username;
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username;
            res.status(200).json({ message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Server Error'})
    })
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({ message: 'Error logging out'})
            } else {
                res.status(200).json({ message: 'logout SUCCESS!'})
            }
        });
    } else {
        res.status(200).json({ message: 'You are already logged out! '})
    }
})


module.exports = router;