let db =require('../db');

exports.confirm=(name,cb)=>{
  db.get().collection('usersdata').findOne({username:name},(err,data)=>{cb(err,data)})

}
