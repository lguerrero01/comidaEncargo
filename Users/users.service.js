const DB = require('../helpers/db');
// const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.json');

var Users = DB.Users;
const SECRET_KEY = config.secret;

module.exports = {
    createUser,
    loginUser,
    getById
};

async function createUser(datos) {
    const newUser = {
        email: datos.email,
        password: bcrypt.hashSync(datos.password)
    }

    const user = new Users(newUser);
    let data = {};
    try {
        await user.save();
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({
            id: user.id
        },
            SECRET_KEY, {
            expiresIn: expiresIn
        });
        const dataUser = {
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        // response 

        data = {
            ...dataUser
        };

        return data;

    } catch (err) {
        throw (err);
    }

}

async function loginUser(datos) {
    const userData = {
        email: datos.email,
        password: datos.password
    }

    let data = {};
    const user = await Users.findOne({
        email: userData.email
    });

    if (!user) {
        // email does not exist
        throw ('este email no existe');

    } else {
        const resultPassword = bcrypt.compareSync(userData.password, user.password);
        console.log(userData, resultPassword);
        if (resultPassword) {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({
                id: user.id
            }, SECRET_KEY, {
                expiresIn: expiresIn
            });

            const dataUser = {
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            data = {
                ...dataUser
            };

        } else {
            // password wrong
            throw ('La contraseña es incorrecta');

        }

    }
    return data;
}

async function getById(userId) {
    return await Users.findOne({
        _id: userId
    });
}









// async function getUsers() {
//     return await Users.find();
// }
// async function createUser(datos) {

//     const newUser = {
//         email: datos.email,
//         password: ''
//     }

//     let data = {};

//     crypto.randomBytes(16, (err, salt) => {
//         const newSalt = salt.toString('base64')

//         crypto.pbkdf2(newUser.password, newSalt, 10000, 64, 'sha1', async (err, key) => {
//             try {
//                 const encryptedPassword = key.toString('base64')
//                 newUser.password = encryptedPassword;
//                 const user = new Users(newUser);

//                 // await user.save();
//                 const dataUser = {
//                     email: user.email,
//                     password: encryptedPassword
//                 }
//                 console.log(dataUser.password)
//                 data = {
//                     ...dataUser
//                 };

//                 return data;

//             } catch (err) {
//                 console.log(err)
//                 throw (err);
//             }
//         })
//     })



// }

// async function loginUser(datos) {

//     const userData = {
//         email: datos.email,
//         password: datos.password
//     }
//     // let data = {};
//     const user = await Users.findOne({
//         email: userData.email
//     });

//     if (!user) {
//         // email does not exist
//         throw ('este email no existe')

//     } else {
//         console.log("linea 76", user.salt)
//         const key = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha1')
//         console.log(key)
//         const encryptedPassword = key.toString('base64')
//         if (user.password === encryptedPassword) {
//             const token = signToken(user._id)
//             return (token)
//         } else {
//             throw ('contraseña es incorrecta');
//         }

//     }


// }

// function signToken(_id) {
//     return jwt.sign({ _id }, 'my-secret', {
//         expiresIn: 60 * 60 * 24 * 365,
//     })
// }