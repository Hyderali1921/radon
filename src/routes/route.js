const express = require('express');
const lodash = require('lodash');
const externalmodule = require('./logger')
const externalmodule2 = require('../util/helper')
const externalmodule3 = require('../validator/formatter')
const router = express.Router();
router.get('/hello', function(req, res) {
    // externalmodule.welcome()
    // externalmodule2.date()
    // externalmodule2.month()
    // externalmodule2.batch()
    // externalmodule3.formatter()
    res.send('My first ever api!')
    const array = ["january", "february", "march", "april", "may", "june", "july", "august", "sep", "oct", "nov", "dec"]
    console.log(lodash.chunk(array, 3))
    const array1 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    console.log(lodash.tail(array1))
    const a = [100, 101]
    const b = [102, 100]
    const c = [101, 103]
    const d = [104, 102]
    const e = [105, 108]
    console.log(lodash.union(a, b, c, d, e))
    const movies = [
        ["horror",
            "The Shining "
        ],
        ["drama", "Titanic"],
        ["thriller", "Shutter Island"],
        ["fantasy", "Pans Labyrinth "]
    ]
    console.log(lodash.fromPairs(movies))

});
module.exports = router;