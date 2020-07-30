const express = require('express');
const router = express.Router();
const DB = require('../helpers/db');
const COLLECTION_ORDERS = DB.Orders;

module.exports = {
    router,
    getOrders,
    getOrder,
    addOrder,
    editOrder,
    deleteOrder
};

async function getOrders() {
    return await COLLECTION_ORDERS.find();
}

async function getOrder(idOrder) {
    return await COLLECTION_ORDERS.findById(idOrder);
}

async function addOrder(atributes) {
    try {
        const NEW_ORDER = new COLLECTION_ORDERS(atributes);
        await NEW_ORDER.save();
        return NEW_ORDER;
    } catch (error) {
        throw error;
    }

}

async function editOrder(idOrder, newAtributes) {
    try {
        await COLLECTION_ORDERS.findByIdAndUpdate({
            _id: idOrder,
        },
            newAtributes);
    } catch (error) {
        throw error;
    }
}

async function deleteOrder(idOrder) {
    try {
        await COLLECTION_ORDERS.findByIdAndRemove(idOrder);
    } catch (error) {
        throw error;
    }
}