const express = require('express');
const externalmodule = require('./logger')
const externalmodule2 = require('../util/helper')
const externalmodule3 = require('../validator/formatter')
const router = express.Router();

router.get('/test-me', function(req, res) {
    externalmodule.welcome
    externalmodule2.date()
    externalmodule2.month()
    externalmodule2.batch()
    externalmodule3.formatter()
    res.send('My first ever api!')

});

module.exports = router;
// adding this comment for no reason