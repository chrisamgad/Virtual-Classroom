const mongoose=require('mongoose')

const assignmentSchema = new mongoose.Schema({
    name:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    description:{
        type:String
    },
    DueDate:{
        type: Date
    },
    assignmentfile: {
        type:mongoose.Schema.Types.ObjectId, //allows storing binary data, which helps us in storing files
        ref:'assignment-file'
    },
    grade:{
        type: Number
    },
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    }]
})

const Assignment = mongoose.model("assignment", assignmentSchema);

module.exports = Assignment;