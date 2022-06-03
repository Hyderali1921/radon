const express = require('express');
const lodash = require('lodash');
const externalmodule = require('./logger')
const externalmodule2 = require('../util/helper')
const externalmodule3 = require('../validator/formatter')
const router = express.Router();
router.get('/hello', function(req, res) {
    externalmodule.welcome()
    externalmodule2.date()
    externalmodule2.month()
    externalmodule2.batch()
    externalmodule3.formatter()
    res.send('My first ever api!')
});
router.get('/hel0', function(req, res) {
    const array = ["january", "february", "march", "april", "may", "june", "july", "august", "sep", "oct", "nov", "dec"]
    console.log(lodash.chunk(array, 3));
    const array1 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    console.log(lodash.tail(array1));
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
    res.send('My first ever api!')
});
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

let players = [{
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "virat",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "banglore",
        "sports": [
            "cricket"
        ]
    }, {
        "name": "rohit",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "swimming"
        ]
    },


]



router.post('/players', function(req, res) {
    let ele = req.body
    let ele2 = ele.name
    let isNameRepeated = false

    // let player = players.find(p => p.name == ele2)

    for (let i = 0; i < players.length; i++) {
        if (players[i].name == ele2) {
            isNameRepeated = true;
            break;
        }
    }

    //undefined is same as false/ a falsy value
    if (isNameRepeated) {
        // Player exists
        res.send("This player was already added!")
    } else {
        //New entry
        players.push(ele)
        res.send(players)
    }
});
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/Movies', function(req, res) {
    const array = ["abcd", "kgf", "spy", "kabir singh", "kick"]
    res.send(array);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// router.get('/movies/:indexNumber', function(req, res) {
//     const movie = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
//     let num = req.params.indexNumber
//     if (num >= movie.length) {
//         console.log("use a valid indexNumber")
//     }
//     res.send({
//         data: 'Movie name is ' + movie[num]
//     })
// });
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/moviess/:indexNumberr', function(req, res) {
    const movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    let index = movies[req.params.indexNumberr]
    if (index !== movies.length) {
        res.send(index || "ERROR - Enter Valid IndexNumber")
    }
    console.log("Response is sent ")

});
// ////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/moovies', function(req, res) {
    const films = [{
        "id": 1,
        "name": "the shinning"
    }, {
        "id": 2,
        "name": "Incendies"
    }, {
        "id": 3,
        "name": "Rang de Basanti"
    }, {
        "id": 4,
        "name": "Finding Nemo"
    }]
    res.send(films)
    console.log("Response sent")
});
// /////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/moviees/:filmId', function(req, res) {
    const films = [{
        "id": 1,
        "name": "the shinning"
    }, {
        "id": 2,
        "name": "Incendies"
    }, {
        "id": 3,
        "name": "Rang de Basanti"
    }, {
        "id": 4,
        "name": "Finding Nemo"
    }]
    let idName = films[req.params.filmId - 1]
    if (idName !== films.length) {
        res.send(idName || "no film exist")
    }
    console.log("response sent")
});
module.exports = router;