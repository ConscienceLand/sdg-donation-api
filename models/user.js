var db = require('../libraries/db');
var Helper = require('../libraries/helper');

let service = {
    add: add,
    get: get,
    available: available
};

function available(email) {
    return new Promise((resolve, reject) => {
        db.select('SELECT `id` FROM `user` WHERE `email`=? AND `deleted`=0;', [email])
            .then((result) => {
                    if (result.length)
                        reject(Error('ERR_EMAIL_EXISTS'));
                    else
                        resolve();
                },
                (error) => {
                    console.log(error.message);
                    reject(Error('ERR_CHECK_EMAIL_EXISTS'));
                });
    });
};

function get(code) {
    return new Promise((resolve, reject) => {
        db.select('SELECT `id`, `email`, `created_at` FROM `user` WHERE `id`=? AND `deleted`=0;', [code])
            .then((result) => {
                if (result.length)
                    resolve(result[0]);
                else
                    reject(Error('ERR_USER_NOT_FOUND'));
            },
                  (error) => {
                      console.log(error.message);
                      reject(Error('ERR_GET_USER'));
                  });
    });
};

function add(email, language) {
    return new Promise((resolve, reject) => {
        let user = {
            email: email,
            language: language,
            id: Helper.generate_random_string(30,false).toUpperCase()
        };
        db.insert('user', user)
            .then((result) => resolve(user),
                (error) => {
                    console.log(error.message);
                    reject(Error('ERR_CREATE_USER'));
                });
    });
}

module.exports = service;
