let user=require('../models/getdata');

exports.getNews=(req,res)=>{
  user.getNews((err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}
exports.getUser=(req,res)=>{
  let data={username:req.body.username,password:req.body.password};
user.getUser(data,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}
