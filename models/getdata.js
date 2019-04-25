let db =require('../db');
const ObjectId=require('mongodb').ObjectId;
exports.getNews=(cb)=>{
    db.get().collection('news').find().toArray((err,data)=>{cb(err,data)})
}
exports.getUser=(data,cb)=>{
  db.get().collection('usersdata').findOne({username:data.username,password:data.password},(err,result)=>{
    if(result===null){
      db.get().collection('superuser').findOne({username:data.username,password:data.password},(err,data)=>{cb(err,data)})
    }
    else {cb(err,result)}
  })
}
