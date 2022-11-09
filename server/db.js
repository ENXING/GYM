const { response } = require('express');
const express = require('express');

const app = express();

app.all('/jsonp-server', (request, response)=>{
	response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
	let x =[] 
	for (let i = 0; i < 100; i++) x.push(i)
	function between(min, max) {
		return Math.floor(Math.random() * (max-min) + min)
	}
	let data = x.map((key)=> Math.random(10,10 + key))

	let str = JSON.stringify(data)
	console.log(str)
	response.send(str);
	// response.send("xxxxx")
});
app.get('/server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('HELLO AJAX - 2 express');
});

var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/test");

mongoose.connection.once("open",function(){
	console.log("数据库连接成功~~~");
});

mongoose.connection.once("close",function(){
	console.log("数据库连接已经断开~~~");
});

mongoose.disconnect();

app.listen(10201, () => {
    console.log("hhh");
});