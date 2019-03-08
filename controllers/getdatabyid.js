let getdata=require('../models/getdatabyid');
exports.getMess=(id,cb)=>{
  getdata.getMessageById(id,(err,result)=>{
          cb(result)
  })
}

exports.getMessageById=(req,res)=>{
  let id=req.body.id;
getdata.getMessageById(id,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)
  })
}
exports.getUserMessageById=(req,res)=>{
  let id=req.body.id;
getdata.getUserMessageById(id,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)
  })
}
exports.writeMessageById=(req,res)=>{
  let id=req.body.id;
  let data=req.body.data;
  let key =req.body.key
getdata.writeMessageById(id,data,key,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)
  })
}
exports.getBankById=(req,res)=>{
  let id=req.body.id;
getdata.getBankById(id,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)
  })
}
exports.userData=(req,res)=>{
  let id=req.body.id;
getdata.userData(id,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    console.log(result);
    res.json(result);
  })
}
exports.confirmById=(req,res)=>{
  let id1=req.body.id1;
  let id2=req.body.id2
getdata.confirmById(id1,id2,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    console.log('result');
    res.json(result);
  })
}
exports.deleteUser=(req,res)=>{
  let id1=req.body.id1;
  let id2=req.body.id2
getdata.deleteUser(id1,id2,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    console.log('result');
    res.json(result);
  })
}
