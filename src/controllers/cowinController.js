let axios = require("axios")


let getlondonTemp= async function (req, res) {

    try {
        let api = req.query.appid
        let city=req.query.q
        let options = {
            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data.main.temp
        res.status(200).send({ temperature: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
// //////////
const getTempOfCities=async function(req,res){
    try{
        let cities=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let TempCities=[]
        for(i=0;i<cities.length;i++){
            let objectcity={city:cities[i]}
            let options= {
                method: 'get',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=3e5f788fb70bcb64641358173ff44f4e`
            }
            let result=await axios(options);
            let data = result.data.main.temp
            objectcity.temp=data
            TempCities.push(objectcity)
        }
const sortTemp =TempCities.sort(function(a,b){ return  a.temp-b.temp  })
res.send({data:sortTemp})
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
    }


let getDistricts = async function (req, res) {
    try {
        let id = req.query.Districts
        let date =req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ Data: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
// ///////////////////////////////////////

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}




const getMemes=async function(req,res){
    try{
        let id= req.query.template_id 
        let textA= req.query.text0
        let textB= req.query.text1
        let user= req.query.username 
        let key= req.query.password
        let options = {
            method: 'get',
            url: `https://api.imgflip.com/caption_image?template_id=${id}&text0=${textA}&text1=${textB}&username=${user}&password=${key}`
        }
    
        let result = await axios(options);
        console.log(result.data)
        let data=result.data
res.send({msg:data})
    }
      catch(err){
        res.send({msg:"server error"})
    }
}
module.exports.getTempOfCities=getTempOfCities
module.exports.getlondonTemp = getlondonTemp
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getMemes = getMemes