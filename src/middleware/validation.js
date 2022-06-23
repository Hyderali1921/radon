const tags = []
const category = []
const subCategory = []
function minimumCost(a, b)
{
    // Stores the frequency of string
    // a and b respectively
    var fre1 = Array(256).fill(0), fre2= Array(256).fill(0);
 
    // Store the frequencies of
    // characters in a
    a.split('').forEach(c => {
        fre1[c.charCodeAt(0)]++;
    });
 
    // Store the frequencies of
    // characters in b
    b.split('').forEach(c => {
        fre2[c.charCodeAt(0)]++;
    });
 
    // Minimum cost to convert A to B
    var mincost = 0;
 
    // Find the minimum cost
    for (var i = 0; i < 256; i++) {
        mincost += Math.abs(fre1[i]
                       - fre2[i]);
    }
 
    // Print the minimum cost
    return mincost ;
}



//  a  = f(27)
//    asjk,jkl,
// ["asjk","jkl",""]

const validateTags = (tags)=>{
  if(!Array.isArray(tags)){
      return tags.split(",").filter((tag)=>{
          return tag!==""
      })
  }
  return tags

}
//  "asgh,gdh,dghd,h" aftersplit ["asgh","gdh","dghd","h"]

const validateSubCategory = (subCategory)=>{
    if(!Array.isArray(subCategory)){
        return subCategory.split(",").filter((subcategory)=>{
            return subcategory!==""
        })
    }
    return subCategory
}

const validateCategory = (category)=>{

}
//                        (?=.*[0-9]) atleast one digit 
//                        (?=.*[A-Z]) atleast one uppercase letter
//                        (?=.*[a-z]) atleast one lowercase letter
//                        (?=.[!@#$%^&]) atleast one special charactor
//                         [a-zA-Z0-9!@#$%^&]{6,16} length in b/w in 6 to 16 and any char belongs to [a-zA-Z0-9!@#$%^&]
const validatePassword = (password,res)=>{
     let regex = /^(?=.[0-9])(?=.[A-Z])(?=.[a-z])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/
     if(!regex.test(password)) {
         res.status(400).send({status:false,msg:"Password must contain atleast one uppercase , one lowercase,one special charactor,and lenght of paasword must be in range [6,16]"})
        return false;
     }
     return true;
}

const validateName = (Name,res,whatis)=>{
      let regex = /[A-Z]{1}[a-z]{2}[a-z]*/
      if(!regex.test(Name)) {
          res.status(400).send({status:false,msg:`${whatis} must start with upper case letter and length must be greater than 2`})
          return false;
      }
  return true;

}








const validateObjectId = (id,res,whatIs)=>{
    // console.log(id)
    var regex = /[a-f0-9]{24}/;
    if(!regex.test(id)) {
        res.status(400).send({status:false,msg:`${whatIs} is Not Valid`});
        return false;
    }
    return true;
}





const validateEmail = (email,res)=>{   
    var regex = /\S+@\S+\.\S+/;
    if(!regex.test(email)) {
        res.status(400).send({status:false,msg:"Email should look like this anything@anything.anything"})
        return false;
    }
    return true

  }
 
// //////////////////////////////////
 n

// //////////////////////////////////////
const validateRequest = (req,res,next)=>{
    if(req.query){
       if(req.query.authorId)
          if(!validateObjectId(req.query.authorId,res,"Author Id")) return;
       if(req.query.blogId)
          if(!validateObjectId(req.query.blogId,res,"BlogId Id")) return;
       if(req.query.tags)
          req.query.tags = validateTags(req.query.tags)
       if(req.query.subCategory)
          req.query.subCategory = validateSubCategory(req.query.subCategory)
    }
    if(req.params){
        console.log(req.params)
        if(req.path.params.authorId)
           if(!validateObjectId(req.path.params.authorId,res,"Author Id")) return;
        if(req.path.params.blogId)
           if(!validateObjectId(req.path.params.blogId,res,"BlogId Id")) return;
    }

    if(req.body){
        if(req.body.authorId)
           if(!validateObjectId(req.body.authorId,res,"Author ID")) return;
        if(req.body.tags)
        req.body.tags = validateTags(req.body.tags,res)
        if(req.body.sebCategory)
        req.body.sebCategory = validateSubCategory(req.body.sebCategory,res)
        if(req.body.fname)
           if(!validateName(req.body.fname,res,"fname")) return
        if(req.body.lname)
           if(!validateName(req.body.lname,res,"lname")) return
        if(req.body.email)
           if(!validateEmail(req.body.email,res)) return;
        if(req.body.password)
           if(!validatePassword(req.body.password,res)) return;
           
    }
    next()

}




module.exports.validateRequest = validateRequest