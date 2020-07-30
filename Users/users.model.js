const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    role: {
        type: String,
        default: 'user'
    }
})

const USERS = mongoose.model('Users', usersSchema);

module.exports = {
    USERS
}