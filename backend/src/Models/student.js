mongoose=require('mongoose')

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ID: {
        type: Number,
        required:true
    },
    role:{ //Teacher or Student
        type: String,
        required:true
    }
   });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;