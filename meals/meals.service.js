const express = require('express');
const router = express.Router();
const DB = require('../helpers/db');
const COLLECTION_MEALS = DB.Meals;
module.exports = {
    router,
    getMeals,
    getMeal,
    addMeal,
    editMeal,
    deleteMeal
};

async function getMeals() {
    return await COLLECTION_MEALS.find();
}

async function getMeal(idOrder) {
    return await COLLECTION_MEALS.findById(idOrder);
}

async function addMeal(atributes) {
    try {
        const NEW_ORDER = new COLLECTION_MEALS(atributes);
        await NEW_ORDER.save();
    } catch (error) {
        throw error;
    }

}

async function editMeal(idOrder, newAtributes) {
    try {
        await COLLECTION_MEALS.findByIdAndUpdate({
            _id: idOrder,
        },
            newAtributes);
    } catch (error) {
        throw error;
    }
}

async function deleteMeal(idOrder) {
    try {
        await COLLECTION_MEALS.findByIdAndRemove(idOrder);
    } catch (error) {
        throw error;
    }
}