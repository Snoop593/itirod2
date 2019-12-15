const port = 3000;
const socket = io.connect('http://localhost:' + port);
let stateName = ""

socket.on('userName',(name,data)=>{
	stateName = name;
	let textarea = document.querySelector('textarea')
	if(data!=null){
		data.forEach(e=>{
		let d = new Date(e.dat)
		textarea.value+=`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] ${e.nam} - ${e.msg} \n`
	})
	}
	let d = new Date()
	textarea.value +=`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] Добро пожаловать ${name}\n`
})

socket.on('newUser',name=>{
	let textarea = document.querySelector('textarea')
	let d = new Date()
	textarea.value+=`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] Поприветствуем ${name}\n`
})

function newMessage(){
	let v = document.querySelector('input')
	let message = v.value;
	socket.emit('message',message)
	v.value=""
}

socket.on('messageToClients',(msg,name)=>{
	let textarea = document.querySelector('textarea');
	let d = new Date()
	textarea.value+=`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] ${name} - ${msg}\n`
})
socket.on('leaveToClients',name=>{
	let textarea = document.querySelector('textarea');
	let d = new Date()
	textarea.value+=`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] Пока ${name}\n`
})

window.onunload = ()=>{
	socket.emit('leave',stateName)
}


