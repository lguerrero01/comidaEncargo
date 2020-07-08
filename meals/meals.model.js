const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealsSchema = new Schema({
    name: String,
    description: String
})

const MEALS = mongoose.model('Meals', mealsSchema);

module.exports = {
    MEALS
}