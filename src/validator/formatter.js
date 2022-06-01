const formatter = function() {
    const a = " functionup "
    const b = "function up"
    const c = "FUNCTION UP"
    const trimmer = a.trim();
    const uppercase = b.toUpperCase()
    const lowercase = c.toLowerCase()
    console.log(trimmer)
    console.log(uppercase)
    console.log(lowercase)

}
module.exports.formatter = formatter