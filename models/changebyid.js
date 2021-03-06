let db =require('../db');
const fs=require('fs');
const io=require('../index');
const ObjectId=require('mongodb').ObjectId;

exports.addNews=(id,text,cb)=>{
  let date=new Date()
  let data={_id:ObjectId(id),text:[{text:text,time:` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`}]}
  db.get().collection('news').findOne({_id:ObjectId(id)},(err,result)=>{
    if(result!=null){ console.log(result);let oldlist=result.text;

      oldlist.unshift({text:text,time:` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`});
      db.get().collection('news').updateOne({_id:ObjectId(id)},{$set:{text:oldlist}},(err,result)=>{
        db.get().collection('news').findOne({_id:ObjectId(id)},(err,result)=>{cb(err,result)})
      })

    }
    else {
      db.get().collection('news').insert(data,(err,result)=>{
        db.get().collection('news').findOne({_id:ObjectId(id)},(err,result)=>{cb(err,result)})
      })
    }

  })
}
exports.addBankData=(id,data,cb)=>{
  db.get().collection('banks').updateOne({_id:ObjectId(id)},{$set:{bankdata:data}},(err,data)=>{
      db.get().collection('banks').findOne({_id:ObjectId(id)},(err,result)=>{cb(err,result);})
  })
}
exports.changePasswordById=(id,pass,cb)=>{
  db.get().collection('usersdata').findOne({_id:ObjectId(id)},(err,result)=>{
    if(result===null){
      db.get().collection('superuser').findOne({_id:ObjectId(id)},(err,data)=>{
      db.get().collection('superuser').updateOne({_id:ObjectId(id)},{$set:{password:pass}},(err,result)=>{cb(err,{call:'Ok'})})
          })

    }
    else {
      db.get().collection('usersdata').updateOne({_id:ObjectId(id)},{$set:{password:pass}},(err,result)=>{cb(err,{call:'Ok'})})
    }
  })
}
exports.changeLoginById=(id,login,cb)=>{
  db.get().collection('usersdata').updateOne({_id:ObjectId(id)},{$set:{username:login}},(err,result)=>{cb(err,{call:'Ok'})})
  }
exports.changeNameById=(id,name,cb)=>{
    db.get().collection('usersdata').findOne({_id:ObjectId(id)},(err,result)=>{
      if(result===null){
        db.get().collection('superuser').findOne({_id:ObjectId(id)},(err,data)=>{
        db.get().collection('superuser').updateOne({_id:ObjectId(id)},{$set:{firstname:name.firstname,lastname:name.lastname}},(err,result)=>{cb(err,{call:'Ok',firstname:name.firstname,lastname:name.lastname})})
            })

      }
      else {
        db.get().collection('usersdata').updateOne({_id:ObjectId(id)},{$set:{firstname:name.firstname,lastname:name.lastname}},(err,result)=>{cb(err,{call:'Ok',firstname:name.firstname,lastname:name.lastname})})
      }
    })
  }
  exports.changeDeleteById=(id1,cb)=>{
    let userId;
    db.get().collection('superuser').findOne({username:'superuserhayk'},(err,result1)=>{
      userId=result1._id;
      db.get().collection('messages').findOne({_id:ObjectId(result1._id)},(err,result)=>{
      let message=result.messages;
      let newmessage=[];
      message.map((item)=>{
        if(item._id!=id1) {newmessage.push(item)};
      })
    db.get().collection('messages').updateOne({_id:ObjectId(result1._id)},{$set:{messages:newmessage}},(err,result)=>{})
  })
})
      this.deleteUserImage(id1,(err)=>{
        db.get().collection('usersdata').remove({_id:ObjectId(id1)},(err,result)=>{})

      })
      this.deleteBankImage(id1,(err)=>{})

    db.get().collection('banks').remove({_id:ObjectId(id1)},(err,result)=>{})
    db.get().collection('messages').remove({_id:ObjectId(id1)},(err,result)=>{cb(err,{call:'Ok'})})

  }
exports.deleteBankImage=(id,cb)=>{
    db.get().collection('banks').findOne({_id:ObjectId(id)},(err,result1)=>{
      if(result1.image)
      fs.unlink(`${result1.image.filename}`,(err)=>{
          if(err) console.log(err);
        cb('File deleted');
        })
      })
}
exports.deleteUserImage=(id,cb)=>{
    db.get().collection('superuser').findOne({_id:ObjectId(id)},(err,result1)=>{
      if(result1!=null)
      {fs.unlink(`${result1.img.filename}`,(err)=>{
          if(err) console.log(err);
              return  cb('File deleted');
        })}
        else {
            db.get().collection('usersdata').findOne({_id:ObjectId(id)},(err,result)=>{
              fs.unlink(`${result.img.filename}`,(err)=>{
                  if(err) console.log(err);
                return cb('File deleted');
                })
            })
        }
      })
}
exports.setBankData=(id,data,cb)=>{
    db.get().collection('banks').updateOne({_id:ObjectId(id)},{$set:{bankData:data}},(err,result)=>{cb(err)})
}

exports.addBankImage=(id,image,cb)=>{
  db.get().collection('banks').updateOne({_id:ObjectId(id)},{$set:{image:image}},(err,result)=>{cb(err)})
}
exports.addUserImage=(id,image,cb)=>{
  db.get().collection('superuser').updateOne({_id:ObjectId(id)},{$set:{img:image}},(err,result)=>{
    if(result===null)
    {cb(err)}
    else {
      db.get().collection('usersdata').updateOne({_id:ObjectId(id)},{$set:{img:image}},(err,result)=>{cb(err)})
    }
  })
}
