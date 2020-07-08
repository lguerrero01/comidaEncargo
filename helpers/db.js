var mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


mongoose.Promise = global.Promise;

module.exports = {
    Orders: require('../orders/orders.model'.ORDERS)
};