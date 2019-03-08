let registration=require('../models/registration');

exports.data=(req,res)=>{
  let data={username:req.body.username,password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,img:[]};
  let data1=`${req.body.bankname} ${req.body.phone}`;
  let data2={bankname:req.body.bankname,phone:req.body.phone};
registration.registrat(data,data1,data2,(err,dt)=>{
    if(err){
      console.log('eerrror');
    }
    console.log('send');
    res.json({call:'Registration compilated'})

  })
}
