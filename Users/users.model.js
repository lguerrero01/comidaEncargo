const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

const Users = mongoose.model('Users', usersSchema);

module.exports = {
    Users
}