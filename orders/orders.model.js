const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    mealId: { type: Schema.Types.ObjectId, ref: 'Meals' },
    userId: String,
    description: String
})

const ORDERS = mongoose.model('Orders', ordersSchema);

module.exports = {
    ORDERS
}