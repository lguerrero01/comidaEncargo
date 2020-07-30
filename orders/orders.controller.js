const express = require('express');
const router = express.Router();
const ORDER_SERVICE = require('./orders.service');
const { isAuthenticated, hasRole } = require('../helpers/jwt')

module.exports = router;


//rutas orders get
router.get('/getOrders', getOrders);
router.get('/getOrder/:id', getOrder);

//rutas orders post
router.post('/addOrder', isAuthenticated, addOrder);

//rutas orders put
router.put('/editOrder/:id', isAuthenticated, editOrder);

//rutas order delete 
router.delete('/deleteOrder/:id', isAuthenticated, deleteOrder);


function getOrders(req, res, next) {
    ORDER_SERVICE.getOrders()
        .then((orders) => res.json(orders))
        .catch((err) => next(err));
}

function getOrder(req, res, next) {
    ORDER_SERVICE.getOrder(req.params.id)
        .then((order) => res.json(order))
        .catch((err) => next(err));
}

function addOrder(req, res, next) {
    ORDER_SERVICE.addOrder(req.body)
        .then((x) => res.json(x))
        .catch((err) => next(err));
}

function editOrder(req, res, next) {
    ORDER_SERVICE.editOrder(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}

function deleteOrder(req, res, next) {
    ORDER_SERVICE.deleteOrder(req.params.id)
        .then(() => res.json({}))
        .catch((err) => next(err));
}


