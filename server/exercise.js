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
    videoUrl: {
        type: String
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
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    name: {type: String},
    phoneNumber: {type: Number},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    gender: {type: String, default: "male"},
    birthday: {type: Date},
    password: {
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    },
    // workout: [ workoutSchema ]
    workout: [ mongoose.Schema.Types.ObjectId ]
})


const User = mongoose.model('User', UserSchema);
const ActionName = mongoose.model("Action_Name", actionNameSchema);
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = {
    Workout,
    ActionName,
    User
}