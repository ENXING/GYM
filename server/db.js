const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('./config');
const SECRET = config.jwtSecretKey;


const exercise = require("./exercise")
mongoose.connect("mongodb://127.0.0.1/exercise", ()=>{
	console.log("connected>>>>>>>>>>>>")
}, e=>console.error(e));

async function insertWorkout(obj) {
	
	try{
		let record = {exercise: {name: obj.exercise}, weight: Number(obj.weight), repeat: Number(obj.repeat)}
		console.log(record)
		const actionName = new exercise.Workout(record)
		await actionName.save()
		console.log(actionName)
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
app.use(express.json())

app.post('/api/del-item', urlencodedParser, (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    let str = JSON.stringify(request.body);
	delRecord(request.body.id).then((e)=>{
		response.send(request.body)
	}, (e)=>{
		response.send(e)
	})
});


app.get('/api/users', async (req, res) => {
    const users = await exercise.User.find();
    res.send(users)
});
app.post('/api/register', async (req, res) => {
    // console.log(req.body);
    let user;
    try{
        user = await exercise.User.create({
            username: req.body.username,
            password: req.body.password
        })
    } catch (e) {
        res.status(409).send(e)
        return
    }
    console.log("inserted>>>>>>")
    res.send(user);
});

app.post('/api/login', async (req, res) => {
    // console.log(req.body);
    const user = await exercise.User.findOne({
        username: req.body.username
    })
    if(!user){
        return res.status(422).send({
            message: 'wrong'
        });
    }
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordValid) {
        return res.status(401).send({
            message: 'wrong'
        })
    };
    //生成token
    const token = jwt.sign({
        id: String(user._id),//密码不要放进来，放一个唯一的东西就可以了
    }, SECRET, {expiresIn: 20});

    res.send({
        user,
        token
    });
});
const auth = async (req, res, next) => {
    try {
        const raw = String(req.headers.authorization).split(' ').pop();
        const { id } = jwt.verify(raw, SECRET);
        req.user = await exercise.User.findById(id);//这里需要添加一些错误处理，不执行next
    } catch (e) {
        res.status(402).send(e);
        console.log(e)
        return
    }
    next();
}

app.get('/api/profile', auth, async (req, res) => {
    res.send(req.user);
})

app.post('/api/put-workout', urlencodedParser, (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    let str = JSON.stringify(request.body);
	insertWorkout(request.body)
	response.send(request.body)
});


app.get('/api/get-history', (request, response)=>{
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

app.listen(10201, () => {
    console.log("hhh");
});