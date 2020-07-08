const express = require('express');
const router = express.Router();
const DB = require("../helpers/db");
const COLLECTION_ORDERS = DB.orders;

module.exports = {
    router,
    getOrders
};

async function getOrders() {
    return await COLLECTION_ORDERS.find();
}