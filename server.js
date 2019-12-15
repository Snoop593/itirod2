const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { Client } = require('pg')
const port = 3000;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'chat',
  password: 5959692,
  port: 8000,
})
client.connect()

server.listen(port); 
app.use(express.static(__dirname + '/public'));

let names = ["БОМЖ","ОпА$нЫй_ВоЗрА$т","ПуЛя_В_гЛаЗ_и_Ты_УнИТаЗ","Не_ежык_но_в_тумане","COCOK_B_NOCOK","CbIpOCTb_oT_HoCkA","100pudoff",
"Mr.ПеLьМЕshKa","Ǿग₳₡Ħ₳я Ҕ₳Ҕ₳","Сильвестр в столовой"]


io.on('connection',socket=>{
	//client.query(`TRUNCATE TABLE chat`,(err,res)=>{console.log(res)})
	let name = `${names[ran(0,9)]} ${ran(0,100)}`
	socket.broadcast.emit('newUser',name)
	client.query(`SELECT * FROM chat `,(err, res) => {
		socket.emit('userName',name,res.rows.slice())
	})
	
	toBD({name,msg:"Зашел в чат",date: new Date()})
	socket.on('message',msg=>{
		toBD({name,msg,date: new Date()})
		io.sockets.emit('messageToClients', msg, name);
	})
	socket.on('leave',name=>{
		toBD({name,msg:"Вышел из чата",date: new Date()})
		io.sockets.emit('leaveToClients',name)
	})
})

function toBD({name,msg,date}){
	client.query(`INSERT INTO chat(nam,msg,dat) VALUES ($1, $2,$3)`,[name,msg,date],(err, res) => {
	})
}

function ran(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
