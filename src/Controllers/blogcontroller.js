const blogModel=require("../Models/blogModel")
const jwt = require("jsonwebtoken");
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

const blogs = async (req,res)=>{
    
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
























    module.exports.blogs=blogs

    module.exports.createBlogDoc=createBlogDoc