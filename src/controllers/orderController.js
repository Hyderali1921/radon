const orderModel= require("../models/order")
const userModel= require("../models/userModels")
const productModel= require("../models/productModel")

const createOrder= async (req, res) => {
    let data = req.body
    let userId = data.user_id
    let productId = data.product_id
// =======[ validation]
    let userData = await userModel.findById(userId)
    if (!userData) return res.send("Invalid User Id")

    let productData = await productModel.findById(productId)
    if (!productData) return res.send("Invalid Product Id")
// ========[ ]

    let isFreeAppUser = req.header.isFreeAppUser
    if(isFreeAppUser===true){
     req.body.isFreeAppUser = true;
     req.body.amount = 0
 
    }
    else if(isFreeAppUser===false){
     ProductId = req.body.product_id
     UserId= req.body.user_id
     productPrice = await productModel.findbyId(productId).select({price:1, _id:0})
     amount = await userModel.findById(userId).select({balance:1, _id:0})
     if(productPrice<=amount){
         req.body.amount = amount - productPrice;
         req.body.isFreeAppUser = false
     }
}

    let allData = await orderModel.create(data)
    res.send(allData)
}

module.exports.createOrder = createOrder