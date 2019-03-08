const express=require('express');
const app=express();
const cors = require('cors');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const db=require('./db');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const xlsx = require('xlsx');
//controllers import

let registration=require('./controllers/registration');
let getUserData=require('./controllers/getdata');
let getDataById=require('./controllers/getdatabyid');
let getAllBanks=require('./controllers/getbanks');
let userConfirm=require('./controllers/userconfirm');
let changeById=require('./controllers/changebyid');
let multer=require('./multer');
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(cors());
const port = 4001;


//excel read
var workbook = xlsx.readFile(__dirname+'/file/1.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);



//socket
const io = socketIO(server);
io.on('connection', socket => {
  console.log('User connected');
  socket.on('create', (id)=>{
  socket.join(id);
  getDataById.getMess(id,(result)=>{
    socket.in(id).emit('message',result);
  })
  })
socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
server.listen(port, () => console.log(`Listening on port ${port}`))

//registration
app.post('/post',registration.data);
//join
app.post('/post/user',getUserData.getUser);
//
app.post('/post/user/message',getDataById.getMessageById);
app.post('/post/user/message/user',getDataById.getUserMessageById);
app.post('/post/user/message/write',getDataById.writeMessageById);
app.post('/post/user/bank',getDataById.getBankById);
app.post('/post/user/confirm',userConfirm.confirm);
app.get('/allbanks',getAllBanks.getAll);
app.post('/post/userdata',getDataById.userData);
app.post('/post/confirm',getDataById.confirmById);
app.post('/post/deleteuser',getDataById.deleteUser);
app.post('/post/change_password',changeById.changePasswordById);
app.post('/post/change_login',changeById.changeLoginById);
app.post('/post/change_name',changeById.changeNameById);
app.post('/post/delete_user',changeById.changeDeleteById);

app.post('/post/bank/image',multer.bankImgUpload);
app.post('/post/user/image',multer.userImgUpload);


//server
db.connect('mongodb://localhost:27017/newbankdata', function(err){
  if(err){
  return  err
  }
  app.listen(3000,()=>{console.log('API started');})

  });