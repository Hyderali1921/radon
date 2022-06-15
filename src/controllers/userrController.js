const userModel=require("../models/userModels")

// const productModel=require("../models/productModel")


const createUser= async function (req, res) {
    let data= req.body
    // req.headers["isFreeAppUser"]=true

    let savedData= await userModel.create(data)
    res.send({msg: savedData})
}
const createProduct= async function (req, res) {

    let productdata= req.body


    let savedData= await productModel.create(productdata)
    res.send({msg: savedData})
}
module.exports.createUser=createUser
module.exports.createProduct=createProduct
