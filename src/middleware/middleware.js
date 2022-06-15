const checkHeader = async ( req, res, next) => {
//    console.log(req.headers)
    let header = req.headers.isfreeappuser;
   if(!header)
    return res.send({msg:"request is missing a mandatory header"})
    next()
};

module.exports.checkHeader = checkHeader
