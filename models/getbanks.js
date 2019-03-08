let db =require('../db');

exports.getAll=(cb)=>{
  db.get().collection('banks').find().toArray((err,data)=>{  cb(err,data)})
}
