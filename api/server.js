  
const express = require('express');
const session = require('express-session');
const KnexSessionStorage = require('connect-session-knex')(session);


const apiRouter = require('./api-router')
const knexConnection = require('../data/db-config')
const configureMiddleware = require('./configure-middleware')


const server = express();


const sessionConfiguration = {
    name: 'mango',
    secret: process.env.COOKIE_SECRET || 'is it secret? is it safe?',
    cookie: {
        maxAge: 1000 * 60 * 60, // valid for 1 hr
        secure: process.env.NODE_ENV === 'development' ? false : true,
        httpOnly: true 
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStorage({
        knex: knexConnection,
        clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 minutes
        tablename: 'user_sessions',
        sidfieldname: 'id',
        createtable: true
    })
}

configureMiddleware(server);
server.use(session(sessionConfiguration))

server.use('/api', apiRouter);


module.exports = server;