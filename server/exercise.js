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
    }
})
module.exports = {
    Workout: mongoose.model("Workout", workoutSchema),
    ActionName: mongoose.model("Action_Name", actionNameSchema)
}