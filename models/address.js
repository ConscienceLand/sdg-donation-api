var db = require('../libraries/db');
var Helper = require('../libraries/helper');

const ADDRESS_ASSIGN_TIME = 10;
const ADDRESS_REASSIGN_THRESHOLD = 60;

let service = {
    get: get,
    getAvailable: getAvailable,
    assign: assign
};

function assign(address_id, code, project) {
    let now = Helper.time();

    let assignment = {
        address_id: address_id,
        user_id: code,
        project: project,
        start: now,
        end: now + ADDRESS_ASSIGN_TIME
    };

    return db.insert('address_assignment', assignment)
        .then((result) => db.query('UPDATE `address` SET `assigned_in`=? WHERE id=?', [result.insertId, address_id]))
        .catch((error) => {
            console.log(error.message);
            throw Error('ERR_ASSIGN_ADDRESS');
        });
}

function getAvailable(currency) {
    return db.select('SELECT `address`.`id` FROM `address` LEFT JOIN `address_assignment` ON `address`.`assigned_in`=`address_assignment`.`id` WHERE `address`.`currency`=? AND (`address_assignment`.`end`<? OR `address`.`assigned_in` IS NULL) AND `deleted`=0 LIMIT 1;', [currency, Helper.time() - ADDRESS_REASSIGN_THRESHOLD])
        .then((result) => {
            if (result.length)
                return result[0].id;
            else
                throw Error('ERR_NO_AVAILABLE_ADDRESS');
        }, (error) => {
            console.log(error.message);
            throw Error('ERR_GET_AVAILABLE_ADDRESS');
        });
}

function get(code, project, currency) {
    return new Promise((resolve, reject) => {
        db.select('SELECT `address`.`id`, `address`.`address`, `address`.`currency`, `address`.`meta`, `address_assignment`.`start`, `address_assignment`.`end` FROM `address_assignment` JOIN `address` ON `address_assignment`.`address_id`=`address`.`id` WHERE `address_assignment`.`user_id`=? AND `address_assignment`.`project`=? AND `address`.`currency`=? AND `address`.`deleted`=0 AND `address_assignment`.`end`>? ORDER BY `address_assignment`.`end` DESC;', [code, project, currency, Helper.time()])
            .then((result) => {
                if (result.length)
                    resolve(result[0]);
                else
                    resolve();
            })
            .catch((error) => {
                console.log(error.message);
                reject(Error('ERR_GET_ADDRESS'));
            });
    });
}


module.exports = service;
