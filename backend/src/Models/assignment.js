const mongoose=require('mongoose')

const assignmentSchema = new mongoose.Schema({
    name:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    SubmissionStatus:{
        type:String
    },
    DueDate:{
        type: Date
    },
    assignmentfile: {
        type: Buffer //allows storing binary data, which helps us in storing files
        
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