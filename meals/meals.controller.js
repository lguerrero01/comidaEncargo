const express = require('express');
const router = express.Router();
const MEALS_SERVICE = require('./meals.service');



//rutas meals get
router.get('/getMeals', getMeals);
router.get('/getMeal/:id', getMeal);

//rutas meals post
router.post('/addMeal', addMeal);

//rutas meals put
router.put('/editMeal/:id', editMeal);

//rutas meal delete 
router.delete('/deleteMeal/:id', deleteMeal);


function getMeals(req, res, next) {
    MEALS_SERVICE.getMeals()
        .then((meals) => res.json(meals))
        .catch((err) => next(err));
}

function getMeal(req, res, next) {
    MEALS_SERVICE.getMeal(req.params.id)
        .then((meal) => res.json(meal))
        .catch((err) => next(err));
}

function addMeal(req, res, next) {
    MEALS_SERVICE.addMeal(req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}

function editMeal(req, res, next) {
    MEALS_SERVICE.editMeal(req.params.id, req.body)
        .then(() => res.json({}))
        .catch((err) => next(err));
}

function deleteMeal(req, res, next) {
    MEALS_SERVICE.deleteMeal(req.params.id)
        .then(() => res.json({}))
        .catch((err) => next(err));
}


module.exports = router;
