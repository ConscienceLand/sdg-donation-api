/**
 *description router class
 */
let express = require('express'),
    router = express.Router(),
    config = require('../config/config.js'),
    UserCtrl = require('./user.js'),
    DepositCtrl = require('./deposit.js'),
    ProjectCtrl = require('./project.js');

router.post('/user/signup', UserCtrl.signup);
router.get('/user/check', UserCtrl.check);
router.get('/project/status/:project_id', ProjectCtrl.status);
router.get('/deposits', DepositCtrl.list);
router.get('/address/:project/:currency', DepositCtrl.address);

exports.routes = router;
