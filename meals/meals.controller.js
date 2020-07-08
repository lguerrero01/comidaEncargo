const express = require('express');
const router = express.Router();
const meals = require('./meals.model')

router.get('/meals', (req, res) => {
    console.log("hola");
    meals.find()
        .exec()
        .then(x => res.send(x))
})

router.get('/meals/:id', (req, res) => {
    meals.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})
router.post('/', (req, res) => {
    meals.create(req.body)
        .then(x => res.status(201).send(x))
})
router.put('/:id', (req, res) => {
    meals.findByIdAndUpdate(req.body.id, req.body)
        .then(x => res.status(204).send(x))
})
router.delete('/:id', (req, res) => {
    meals.findOneAndUpdate(req.params.id)
        .exec()
        .then(() => res.sendStatus(204))
})

module.exports = router;
