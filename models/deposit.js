var db = require('../libraries/db');

let service = {
    listAll: listAll,
    sumProject: sumProject
};

function listAll(code) {
    return new Promise((resolve, reject) => {
        db.select('SELECT `deposit`.`id`, `address`.`address`, `deposit`.`created_at`, `deposit`.`amount`, `deposit`.`currency`, `deposit`.`project` FROM `deposit` JOIN `deposit`.`assignment_id`=`address_assignment`.`id` JOIN `address` ON `address_assignment`.`address_id`=`address`.`id` WHERE `user`=? AND `deleted`=0;', [code])
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error.message);
                reject(Error('ERR_LIST_DEPOSITS'));
            });
    });
}

function sumProject(project) {
    return new Promise((resolve, reject) => {
        db.select('SELECT `project_currency`.`currency`, COALESCE(SUM(`deposit`.`amount`),0) as amount FROM `project_currency` JOIN `deposit` ON `deposit`.`project`=`project_currency`.`project` AND `deposit`.`currency`=`project_currency`.`currency` WHERE `project_currency`.`project`=? AND `deleted`=0;', [project])
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error.message);
                reject(Error('ERR_SUM_PROJECT'));
            });
    });
}

module.exports = service;
