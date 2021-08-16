const mongoose=require('mongoose')

const assignmentSchema = new mongoose.Schema({
    GradeStatus:{
        type:String
    },
    DueDate:{
        type: Date
    },
    assignmentfile: {
        data: Buffer //allows storing binary data, which helps us in storing files
        
    },
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    }]
})

const Assignment = mongoose.model("assignment", assignmentSchema);

module.exports = Assignment;