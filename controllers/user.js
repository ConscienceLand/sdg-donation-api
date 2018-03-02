let User = require('../models/user.js'),
    Message = require('../models/message.js'),
    Helper = require('../libraries/helper.js'),
    Email = require('../libraries/email.js');

let service = {
    signup: signup,
    check: check
};

function signup(req, res) {
    let email = req.body.email;
    let language = req.body.language;
    User.available(email)
        .then(() => User.add(email, language))
        .then((user) => {
            Email.sendDonationCode(user.id, user.email);
            res.status(200).json(Message.success(undefined, 'SUC_SIGNUP'));
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json(Message.error(error.message));
        });
}

function check(req, res) {
    let code = req.get('donation-code');
    User.get(code)
        .then((user) => {
            res.status(200).json(Message.success(undefined, 'SUC_USER_EXISTS'));
        })
        .catch((error) => {
            res.status(400).json(Message.error(error.message));
        });
}

module.exports = service;
