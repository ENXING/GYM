const mongoose = require("mongoose")

const actionNameSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    photo: String
})


const workoutSchema = new mongoose.Schema({
    exercise: {
        type: actionNameSchema,
        required: true
    },
    repeat: {
        type: Number,
        min: 1,
        required: true
    },
    weight: {
        type: Number,
        min: 1,
        required: true
    },
    created: {
        immutable: true, 
        type: Date,
        default: ()=>Date.now()
    },
    deleted: {
        type: Boolean,
        default: false 
    }

})
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    },
    workout: [ workoutSchema ]
})


const User = mongoose.model('User', UserSchema);
const ActionName = mongoose.model("Action_Name", actionNameSchema);
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = {
    Workout,
    ActionName,
    User
}