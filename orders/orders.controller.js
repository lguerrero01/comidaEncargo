const express = require('express');
const router = express.Router();
const ORDER_SERVICE = require('./orders.service');
module.exports = router;


//rutas orders 
router.get('/getOrders', getOrders);

function getOrders(req, res, next) {
    ORDER_SERVICE.getOrders()
        .then((orders) => res.json(orders))
        .catch((err) => next(err));
}

// router.get('/orders/:id', (req, res) => {
//     res.send(req.params.id)
// })
// router.post('/', (req, res) => {
//     res.send('soy post')
// })
// router.put('/:id', (req, res) => {
//     res.send('hola soy put')
// })
// router.delete('/:id', (req, res) => {
//     res.send('hola soy delete')
// })
