const bcrypt = require('bcryptjs')
const router = require('express').Router();


const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
    res.send('Lets write some API authentication!')
})

router.post('/hash', (req, res) => {
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 13)

    res.status(200).json({ password, hash })
})

router.get('/', (req, res) => {
    res.json({ api: 'up', session: req.session})
})

module.exports = router;