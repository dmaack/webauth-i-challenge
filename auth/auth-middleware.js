const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

module.exports = (req, res, next) => {

    if(req.session && req.session.username) {
        next()
    } else {
        res.status(401).json({ you: 'cannot pass!' })
    }


    // let { username, password } = req.headers;

    // if(username && password) {
    //     Users.findBy({ username })
    //     .first()
    //     .then(user => {
    //         if(user && bcrypt.compareSync(password, user.password)) {
    //             next();
    //         } else {
    //             res.status(401).json({ message: 'Invalid Credentials' })
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: 'Server Error' })
    //     })
    // } else {
    //     res.status(400).json({ message: 'Please provide credentials' })
    // }
}