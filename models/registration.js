let db =require('../db');

exports.registrat=(data,data1,data2,cb)=>{

  db.get().collection('usersdata').insert(data,(err,result)=>{
    let message={_id:result.ops[0]._id,messages:[{key:'2',message:`${data.firstname} ${data.lastname} ${data1}`}]}
  db.get().collection('messages').insert(message,(err,result)=>{})
  let banks={_id:result.ops[0]._id,...data2}
  let alldata={firstname:data.firstname,lastname:data.lastname,_id:result.ops[0]._id,confirm:false};
  db.get().collection('banks').insert(banks,(err,result)=>{})
  db.get().collection('superuser').findOne({username:'superuserhayk'},(err,result)=>{
  db.get().collection('messages').findOne({_id:result._id},(err,data)=>{
  let mess=data.messages;
  mess.push(alldata);
db.get().collection('messages').updateOne({_id:result._id},{$set:{messages:mess}},(err,result)=>{cb(err,result);})
  })
  })
  })


}

// exports.registrat=(data,data1,data2,cb)=>{
//   db.get().collection('superuser').insert(data,(err,result)=>{
//     let data={_id:result.ops[0]._id,messages:[]}
//   db.get().collection('messages').insert(data,(err,result)=>{})
//   cb(err,result);
//   })
//
//
// }
