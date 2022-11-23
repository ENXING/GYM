const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
var cors= require('cors')
const config = require('./config');
const SECRET = config.jwtSecretKey;
const app = express();
const urlencodedParser = express.urlencoded({extended: true})
app.use(express.json({extends: true}))
app.use(cors({
    origin: '*'
    // origin: 'http://127.0.0.1:5501',
    // credentials: true,
}))


const exercise = require("./exercise")
mongoose.connect("mongodb://127.0.0.1/exercise", ()=>{
	console.log("Mongodb connected!")
}, e=>console.error(e));



const auth = async (req, res, next) => {
    try {
        // const raw = String(req.headers.authorization).split(' ').pop();
        // console.log(req.body);
        const raw = req.body['token'];
        const { id } = jwt.verify(raw, SECRET);
        req.user = await exercise.User.findById(id);
    } catch (e) {
        res.status(422).send(e);
        console.log(e)
        return
    }
    next();
}


async function insertWorkout(req) {
    let obj = req.body;
	try{
		let record = {exercise: {name: obj.exercise}, weight: Number(obj.weight), repeat: Number(obj.repeat)}
		const actionName = new exercise.Workout(record)
        await actionName.save()
        await exercise.User.findOne({_id: req.user._id}).then( (user) => {
            user['workout'].push(actionName._id);
            user.save();
        });
	} catch(e) {
		console.log(e.message)
        throw "insert fail"
	}
}

async function getHistory(id) {
	// let filter = {deleted: false};
    return await exercise.User.findOne({ _id: id }).then(  
        async (user) => {
            let ret = []
            for (let key of user.workout) {
                await exercise.Workout.findOne({_id: key, deleted: false}).then(workout => {
                    if (workout !== null) ret.push(workout)
                })
            }
            return ret;
        })
	// return await exercise.Workout.find(filter).lean();
}

async function delRecord(id) {
	let filter = {_id: id};
	return await exercise.Workout.updateOne(filter, {deleted: true});
}

app.post('/api/del-item', urlencodedParser, auth, (req, res) => {
    let str = JSON.stringify(req.body);
	delRecord(req.body.id).then((e)=>{
		res.send(req.body)
	}, (e)=>{
		res.send(e)
	})
});

app.post('/api/register', urlencodedParser, async (req, res) => {
    let user;
    try{
        user = await exercise.User.create(req.body)
    } catch (e) {
        console.log("fail register");
        res.status(409).send(e)
        return
    }
    res.send(user);
});

app.post('/api/logout', urlencodedParser, async (req, res) => {
    res.send({status: "exit"})
})

app.post('/api/login', urlencodedParser, async (req, res) => {
    const user = await exercise.User.findOne({
        email: req.body.email
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
    const expireTime = 600;
    const token = jwt.sign({
        id: String(user._id),
    }, SECRET, {expiresIn: expireTime});

    res.send({
        name :user.username,
        token
    });
});

app.post('/api/profile', urlencodedParser, auth, async (req, res) => {
    res.send(req.user.name);
})

app.post('/api/put-workout', urlencodedParser, auth, (req, res) => {
	insertWorkout(req).then(
        e=> {
            res.send("get workout")
        },
        e=> {
            console.log(e)
            res.status(501).send("fail submit workout")
        }
    )
});

app.post('/api/get-history',urlencodedParser, auth, (req, res)=>{
	getHistory(req.user._id).then((e)=>{
		res.send(JSON.stringify(e));
	}, (e)=>{
        res.status(404);
		res.send(e)
		console.log("error query find in mongo")
	})
});

var PORT = 10201;
app.listen(PORT, () => {
    console.log(`LISTON PORT: ${PORT}`);
});