let change=require('../models/changebyid');

exports.changePasswordById=(req,res)=>{
  let id=req.body.data.id;
  let pass=req.body.data.pass;
  console.log(id);
change.changePasswordById(id,pass,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}
exports.changeLoginById=(req,res)=>{
  let id=req.body.data.id;
  let login=req.body.data.login;
  console.log(id);
change.changeLoginById(id,login,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}
exports.changeNameById=(req,res)=>{
  let id=req.body.data.id;
  let name={firstname:req.body.data.firstname,lastname:req.body.data.lastname};
  console.log(id);
change.changeNameById(id,name,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}
exports.changeDeleteById=(req,res)=>{
  let id=req.body.data.id;
change.changeDeleteById(id,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}
