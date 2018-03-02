var db = require('../libraries/db');
var Deposit = require('../models/deposit');
var Address = require('../models/address');
var Message = require('../models/message');

let service = {
    list: list,
    address: address
};

function list(req, res) {
    let code = req.get('donation-code');
    Deposit.listAll(code)
        .then((deposits) => {
            console.info("list %i deposits for %s", deposits.length, code);
            res.status(200).json(Message.success(deposits, 'SUC_LIST_DEPOSITS'));
        })
        .catch((error) => {
            res.status(400).json(Message.error(error.message));
        });
}

function address(req, res) {
    let code = req.get('donation-code');
    let project = req.params.project;
    let currency = req.params.currency;

    Address.get(code, project, currency)
        .then((address) => (address != undefined) ? address : Address.getAvailable(currency).then((address_id) => Address.assign(address_id, code, project)).then(()=>Address.get(code,project,currency)))
        .then((address) => {
            if(address!=undefined){
                console.info("show address %s to user %s", address.address, code);
                res.status(200).json(Message.success(address));
            } else{
                console.info("no address available for %s to assign to user %s", currency, code);
                res.status(200).json(Message.error('ERR_NO_FREE_ADDRESS'));
            }
        })
        .catch((error) => {
            res.status(400).json(Message.error(error.message));
        });
}

module.exports = service;
