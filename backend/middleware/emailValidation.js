

module.exports=(req,res,next)=>{
       
    if(req.body.email){
        next();
    }
    else{
        res.status(400).json({
            message:"email is not found"
        })
    }
}