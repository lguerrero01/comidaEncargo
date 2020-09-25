const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
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
    }
    // ,
    // role: {
    //     type: String,
    //     default: 'user'
    // }
}, {
    timestamps: true //guarda fecha de cracion y de actualizacion
});

userSchema.set('toJSON', {
    virtuals: true
});
const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users
}