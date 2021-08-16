mongoose=require('mongoose')
import Student from './student'
const teacherSchema = new mongoose.Schema({
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
    mobilenumber: {
        type: Number,
        required:true
    },
    role:{ //Teacher or Student
        type: String,
        required:true
    },
    StudentsList: {
        type: Array,
        ref:'Student'
    }
   });

const Student = mongoose.model("Teacher", studentSchema);

module.exports = Student;