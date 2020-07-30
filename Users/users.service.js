const express = require('express');
const router = express.Router();
const DB = require('../helpers/db');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

var Users = DB.Users;

module.exports = {
    createUser,
    loginUser,
    signToken,
    getUsers
};

async function getUsers() {
    return await Users.find();
}
async function createUser(datos) {

    const newUser = {
        email: datos.email,
        password: ''
    }

    let data = {};
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')

        crypto.pbkdf2(newUser.password, newSalt, 10000, 64, 'sha1', async (err, key) => {
            try {
                const encryptedPassword = key.toString('base64')
                newUser.password = encryptedPassword;
                const user = new Users(newUser);

                await user.save();
                const dataUser = {
                    email: user.email,
                    password: encryptedPassword
                }
                console.log(dataUser.password)
                data = {
                    ...dataUser
                };

                return data;

            } catch (err) {
                throw (err);
            }
        })
    })


}

function loginUser(datos) {
    const { email, password } = datos;

    Users.findOne({ email }).exec()
        .then(user => {
            if (!user) {
                // email does not exist
                return res.send('este email no existe')
            }
            crypto.pbkdf2(password, user.Salt, 10000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64')
                if (user.password === encryptedPassword) {
                    const token = signToken(user._id)
                    return res.send({ token })
                }
                res.send('usuario y/o contraseña incorrecta')
            })
        })


}

function signToken(_id) {
    return jwt.sign({ _id }, 'my-secret', {
        expiresIn: 60 * 60 * 24 * 365,
    })
}