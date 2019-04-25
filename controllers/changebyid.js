let change=require('../models/changebyid');

exports.addNews=(req,res)=>{
  id=req.body.id;
  text=req.body.text;
  change.addNews(id,text,(err,result)=>{
    if(err) {return console.log(err)}
    res.json(result)
  })
}
exports.addBankData=(req,res)=>{
  let id=req.body.id;
  let data=req.body.dat;
  let date=new Date();
  data.time=` ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`
  change.addBankData(id,data,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)
  })
}
exports.changePasswordById=(req,res)=>{
  let id=req.body.id;
  let pass=req.body.pass;
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
  let id=req.body.id;
  let login=req.body.login;
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
  let id=req.body.id;
  let name={firstname:req.body.firstname,lastname:req.body.lastname};
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
  let id=req.body.id;
change.changeDeleteById(id,(err,result)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json(result)

  })
}

exports.setBankData=(req,res)=>{
  let id=req.headers.autorization;
  change.setBankData(id,req.body,(err)=>{
    if(err){
      console.log('err');
    }
    res.json({call:'Ok'})
  })
}
