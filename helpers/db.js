var mongoose = require('mongoose');
const dotenv = require('dotenv');
var config = require('./config.json');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


mongoose.Promise = global.Promise;

module.exports = {
    Orders: require('../orders/orders.model').ORDERS,
    Meals: require('../meals/meals.model').MEALS,
    Users: require('../Users/users.model').USERS

};