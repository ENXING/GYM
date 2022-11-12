var mongoose = require("mongoose");

var exercise = require("./exercise")
mongoose.connect("mongodb://127.0.0.1/exercise", ()=>{
	console.log("connected>>>>>>>>>>>>")
}, e=>console.error(e));

async function run(obj) {
	
	try{
		// insert
		// let actionName = exercise..create({name: obj.exercise, url: 'http://baidu.com'})
		let record = {exercise: {name: obj.exercise}, weight: Number(obj.weight), repeat: Number(obj.repeat)}
		console.log(record)
		const actionName = new exercise.Workout(record)
		await actionName.save()

		console.log(actionName)
		// const workout = new exercise.Workout({exercise: new exercise.ActionName({name: "pull up"}), })
	} catch(e) {
		console.log(e.message)
	}
}

async function getHistory() {
	let filter = {deleted: false};
	return await exercise.Workout.find(filter).lean();
}

async function delRecord(id) {
	let filter = {_id: id};
	return await exercise.Workout.updateOne(filter, {deleted: true});
}
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/del-item', urlencodedParser, (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    let str = JSON.stringify(request.body);
	delRecord(request.body.id).then((e)=>{
		response.send(request.body)
	}, (e)=>{
		response.send(e)
	})
});

app.post('/put-workout', urlencodedParser, (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    let str = JSON.stringify(request.body);
	run(request.body)
	response.send(request.body)
});


app.get('/get-history', (request, response)=>{
	response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');

	getHistory().then((e)=>{
		console.log(JSON.stringify(e))
		response.send(JSON.stringify(e));
	}, (e)=>{
		response.send({})
		console.log("error query find in mongo")
	})
});


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
	response.send(str);
});

app.get('/server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send('HELLO AJAX - 2 express');
});

app.listen(10201, () => {
    console.log("hhh");
});