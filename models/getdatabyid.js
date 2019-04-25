const db =require('../db');
const io=require('../index');
const ObjectId=require('mongodb').ObjectId;

exports.getMessageById=(id,cb)=>{
  db.get().collection('messages').findOne({_id:ObjectId(id)},(err,data)=>{  cb(err,data)})

}

exports.getUsers=(id,cb)=>{
  db.get().collection('usersdata').find().toArray(function(err, docs) {
        cb(err,docs)
  });
}
exports.getUserMessageById=(id,cb)=>{
  db.get().collection('messages').findOne({_id:ObjectId(id)},(err,data)=>{  cb(err,data.messages)})

}
exports.writeMessageById=(id,data1,key,cb)=>{
  db.get().collection('messages').findOne({_id:ObjectId(id)},(err,data)=>{
    let mess=data.messages;
    let dat={key:key,message:data1};
    mess.push(dat);

    db.get().collection('messages').updateOne({_id:ObjectId(id)},{$set:{messages:mess}},(err,result)=>{io.socket(id);cb(err,result)})
      })

}
exports.getBankById=(id,cb)=>{
  db.get().collection('banks').findOne({_id:ObjectId(id)},(err,data)=>{cb(err,data)})
}
exports.userData=(id,cb)=>{
  db.get().collection('usersdata').findOne({_id:ObjectId(id)},(err,result)=>{
    if(result===null){
      db.get().collection('superuser').findOne({_id:ObjectId(id)},(err,data)=>{cb(err,data)})
    }
    else {cb(err,result)}
  })
}
exports.confirmById=(id1,id2,cb)=>{
  db.get().collection('messages').findOne({_id:ObjectId(id1)},(err,result)=>{
    let message=result.messages;
    message.map((item)=>{
      if(item._id==id2) {item['confirm']=true;return}
    })
  db.get().collection('messages').updateOne({_id:ObjectId(id1)},{$set:{messages:message}},(err,result)=>{if(io.socketOn){io.socketUsers(id1)};cb(err,result)})
  })
}
exports.deleteUser=(id1,id2,cb)=>{
  db.get().collection('messages').findOne({_id:ObjectId(id1)},(err,result)=>{
    let message=result.messages;
    let newmessage=[];
    message.map((item)=>{
      if(item._id!=id2) {newmessage.push(item)};
    })
  db.get().collection('messages').updateOne({_id:ObjectId(id1)},{$set:{messages:newmessage}},(err,result)=>{})
})
  db.get().collection('usersdata').remove({_id:ObjectId(id2)},(err,result)=>{})
  db.get().collection('banks').remove({_id:ObjectId(id2)},(err,result)=>{})
  db.get().collection('messages').remove({_id:ObjectId(id2)},(err,result)=>{io.socketUsers(id1);cb(err,result)})

}
