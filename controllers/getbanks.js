let get=require('../models/getbanks');

exports.getAll=(req,res)=>{
get.getAll((err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}
