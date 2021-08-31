const mongoose=require('mongoose')

const student_assignment_attempt_Schema = new mongoose.Schema({
    name:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    status:{
        type:String  //2 states-> Submitted-On-Time, AND Submitted-Late
    },
    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'assignment'
    },
    attempt_file: {
        type:mongoose.Schema.Types.ObjectId, //allows storing binary data, which helps us in storing files
        ref:'file'
    },
    student:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'student'
    }
})

const StudentAssignmentAttempt = mongoose.model("student-assignment-attempt", student_assignment_attempt_Schema);

module.exports = StudentAssignmentAttempt;