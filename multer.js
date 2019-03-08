const multer=require('multer');
const path=require('path');
let change=require('./models/changebyid');
let db =require('./db');
const storage=multer.diskStorage({
  destination:'./public/images/',
  filename:function(req,file,cd){
    cd(null,file.fieldname+'-'+ Date.now()+path.extname(file.originalname));
  }
});
const upload=multer({
  storage:storage,
  fileFilter:function(req,file,cb){
    checkFileType(file,cb);
  }
}).any();

//chech file type
function checkFileType(file,cb){
  const filetypes=/jpeg|jpg|png|gif/;
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimtype=filetypes.test(file.mimetype);
  if(mimtype && extname){
    return cb(null,true);
  }
  else {
    cb('Erroe:Images Only!');
  }
}

exports.bankImgUpload=((req,res)=>{
  upload(req,res,(err)=>{
  change.deleteBankImage(req.body.id,(result)=>{
    if(result!='File deleted') return res.sendStatus(500);
  })
  let img={url:`http://localhost:3000/images/${req.files[0].filename}`,filename:`public/images/${req.files[0].filename}`};
  change.addBankImage(req.body.id,img,(err)=>{
    if(err) return res.sendStatus(500);
    res.json({call:img.url})
  });

  })
})

exports.userImgUpload=((req,res)=>{
  upload(req,res,(err)=>{
  change.deleteUserImage(req.body.id,(result)=>{
    if(result!='File deleted') return res.sendStatus(500);
  })
  let img={url:`http://localhost:3000/images/${req.files[0].filename}`,filename:`public/images/${req.files[0].filename}`};
  change.addUserImage(req.body.id,img,(err)=>{
    if(err) return res.sendStatus(500);
    res.json({call:img.url})
  });

  })
})
