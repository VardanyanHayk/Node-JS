const change=require('../models/changebyid');
const xlsx = require('xlsx');
const workbook = xlsx.readFile('C:/Users/Hayk/Desktop/Projects/new Node.js/file/1.xlsx');
const sheet_name_list = workbook.SheetNames;
const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).slice(-1)[0];

exports.addNews=(req,res)=>{
  id=req.body.id;
  text=req.body.text;
  change.addNews(id,text,(err,result)=>{
    if(err) {return console.log(err)}
    res.json(result)
  })
}
exports.addBankData=(req,res)=>{
  let{y,x1,x2,x3,x4,x5,x6,x7}=xlData;
  let{y1,y2,y3,y4,y5,y6,y7}=req.body.dat;
  let d=-y-parseFloat(y1)*parseFloat(x1)+parseFloat(y2)*parseFloat(x2)+parseFloat(y3)*x3-parseFloat(y4)*x4+parseFloat(y5)*x5+parseFloat(y6)*x6-parseFloat(y7)*x7;
  let p=1/(1+Math.E**(-d));
let id=req.body.id;
let data=req.body.dat;
let date=new Date();
data.c='0,75';
data.pd=p;
if(p<0.75){data.stability='Կայուն'}
else {
  data.stability='Անկայուն';
}
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
