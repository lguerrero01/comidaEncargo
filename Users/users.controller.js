const express = require('express');
const router = express.Router();
const AUTH_SERVICE = require('./users.service');
const isAuthenticated = require('../helpers/jwt')


//rutas users post
router.post('/register', createUser);
router.post('/login', loginUser);
//rutas users get 
router.get('/me', isAuthenticated.isAuthenticated, getUser);

function getUser() {
    AUTH_SERVICE.getUser()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function createUser(req, res, next) {
    AUTH_SERVICE.createUser(req.body)
        .then((data) => res.json(data))
        .catch((err) => next(err));
}

function loginUser(req, res, next) {
    authService.loginUser(req.body)
        .then((data) => res.json(data))
        .catch((err) => next(err));
}


module.exports = router;
