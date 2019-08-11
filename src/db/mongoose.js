const mongoose = require('mongoose');
const config = require('../config/config');

let db;

const dbConnectMongoose = function() {
    return new Promise((resolve,reject) => {
        if(db) {
            return db;
        }
            mongoose.connect(config.mongodbUrl, {
                useNewUrlParser:true,
                useCreateIndex: true,
                useFindAndModify: false
            }).then(() => {
                console.log('mongo connection created');
                resolve(db);
            })
            .catch(err => {
                console.log('error creating db connection: ' + err);
                reject(err);
            });
    });
}

const getDBConexion = function(){
    if(db) {
        return db;
    }
    console.log('There is no mongo connection');
}

module.exports = {
    dbConnectMongoose,
    getDBConexion
}

// mongoose.connect(config.mongodbUrl, {
//     useNewUrlParser:true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).catch((error)=> console.log(error));