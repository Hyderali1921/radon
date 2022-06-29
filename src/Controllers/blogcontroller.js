const blogModel=require("../Models/blogModel")
const jwt = require("jsonwebtoken");
const moment = require('moment')
const lodash = require('lodash')
const mongoose = require("mongoose")
const authorModel = require('../Models/authorModel')





// const TAGS=[]
// const CATEGORY=[]
// const SUBCATEGORY=[]


const createBlogDoc = async function (req, res) {
    try {
        let blogData = req.body
        //consol.log(blogData)
        if ( Object.keys(blogData).length != 0) {
            let savedblogData = await blogModel.create(blogData)
            res.status(201).send({ msg: savedblogData })
        }
        else res.status(400).send({ msg: "BAD REQUEST"})
    }
    
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const getblogs = async (req,res)=>{
    
    let authorId = req.query.authorId || false;
    let category = req.query.category || false;
    let subCategory = req.query.subCategory||false;
    let tag = req.query.tag || false;
    let blogs = await blogModel.find({isDeleted:false,isPublished:true})

    
    // checking by auther_id;
     if(authorId)
        blogs = blogs.filter((blog)=>{ 
           return  blog.authorId.toString() === authorId;
        })
//  checking by category
    if(category)
    blogs = blogs.filter((blog)=>{ 
           return blog.category === category
        })
//  checking by  subcategory

    if(subCategory)               
    blogs = blogs.filter((blog)=>{ 
         return  (blog.subCategory.find(a=>{
            return a===subCategory})||-1) +1
        })
//  Checking by tag
    if(tag)                           
    blogs = blogs.filter((blog)=>{ 
            return  (blog.tags.find((t)=>{
                return t===tag;
            })||-1) + 1 })
    
           if(Object.keys(blogs).length===0){
               return res.status(404).send({status:false,msg:"Data not Found"})
            }
            
            return res.status(200).send({status:true,data:blogs})
    
    }
// ///////////////////////////////////////////////////////

const blogPut = async (req, res) => {

    try {
        let blog = req.body;
        if (Object.keys(blog).length===0) return res.status(400).send({ status: false, msg: "Bad Request" });
        let blogId = req.params.blogId;
        let blogToBeUpdted = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blogToBeUpdted) return res.status(404).send({ status: false, msg: "Blog does not exist" });
        blog["tags"] = lodash.uniq(req.body.tags.concat(blogToBeUpdted.tags));
        blog["subCategory"] = lodash.uniq(req.body.subCategory.concat(blogToBeUpdted.subCategory));
        blog["isPublished"] = true
        blog["publishedAt"] = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");

        let blogUpdated = await blogModel.findOneAndUpdate({ _id: blogId }, blog, { new: true, upsert: true, strict: false })

        if (Object.keys(blogUpdated).length===0) {
            return res.status(404).send({ status: false, msg: "Blog does not exist" })
        }

        return res.status(201).send({ status: true, data: blogUpdated })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

// ////////////////////////////////////////////////////////////////////////////


const blogDeletById = async (req, res) => {
    try {
    if (!req.params.blogId) return res.status(400).send({ status: false, msg: "Bad Request" });
    let blogToBeDeleted = await blogModel.findOne({ _id: req.params.blogId, isDeleted: false })
    if (!blogToBeDeleted) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
    await blogModel.findOneAndUpdate({ _id:req.params.blogId}, { isDeleted: true })
    res.status(200).send()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

// ////////////////////////////////////////////////////////////////////////////
const blogDeletByParams = async (req, res) => {
    
    try {
        if (!req.query) return res.status(400).send({ status: false, msg: "Bad Request" });
    let blogToBeDeleted = await blogModel.find(req.query)
    if (Object.keys(blogToBeDeleted).length===0) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
    for(let i=0;i<blogToBeDeleted.length;i++){
    let temp = JSON.parse(JSON.stringify(blogToBeDeleted[i]));
    temp["deletedAt"] = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");
    temp.isDeleted = true
    let id = mongoose.Types.ObjectId(temp["_id"])
    await blogModel.findOneAndUpdate( {_id:id}, temp,{ new: true, upsert: true, strict: false })
    res.status(200).send()
    }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

    
    
}





// ///////////////////////////////////////////////////////////////////////////////////
    // function minimumCost(a, b)
    // {
    //     // Stores the frequency of string
    //     // a and b respectively
    //     var fre1 = Array(256).fill(0), fre2= Array(256).fill(0);
     
    //     // Store the frequencies of
    //     // characters in a
    //     a.split('').forEach(c => {
    //         fre1[c.charCodeAt(0)]++;
    //     });
     
    //     // Store the frequencies of
    //     // characters in b
    //     b.split('').forEach(c => {
    //         fre2[c.charCodeAt(0)]++;
    //     });
     
    //     // Minimum cost to convert A to B
    //     var mincost = 0;
     
    //     // Find the minimum cost
    //     for (var i = 0; i < 256; i++) {
    //         mincost += Math.abs(fre1[i]
    //                        - fre2[i]);
    //     }
     
    //     // Print the minimum cost
    //     return( mincost );

    // }























    module.exports.blogs = blogs
    module.exports.createBlogDoc = createBlogDoc
    module.exports.blogPut = blogPut
    module.exports.blogDeletById = blogDeletById
    module.exports.blogDeletByParams = blogDeletByParams
    