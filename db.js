const MongoClient=require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;
var state={
  db:null,
  ObjectId:null
};
exports.connect=(url,done)=>{
  if(state.db){
    return done();
  }
  MongoClient.connect(url,(err,db)=>{
    if(err){
      return done(err);
    }
    state.ObjectId=ObjectId;
    state.db=db;
    done();
  })
}
exports.get=()=>{
  return state.db;
}
exports.ObjectId=state.ObjectId;
