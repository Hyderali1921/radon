const printDate = function() {
    const a = " 02 - 06 -2022 "
    console.log("the cureent date is" + "" +
        a)
}

const month = function() {

    const b = " May "
    console.log("the cureent month is" + "" +
        b)
}

const getBatchInfo = function() {
    console.log("Roadon, W3D2, the topic for today is Nodejs module system")
}
module.exports.date = printDate
module.exports.month = month
module.exports.batch = getBatchInfo