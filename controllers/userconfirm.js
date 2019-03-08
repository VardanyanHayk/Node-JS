let user=require('../models/userconfirm');

exports.confirm=(req,res)=>{
  let name=req.body.username;
user.confirm(name,(err,result)=>{
    if(err){
      console.log(err);
    }
    console.log('send');
    if(result===null){res.json({call:'Ok'})}
    else {
        res.json({call:'false'})
    }


  })
}
