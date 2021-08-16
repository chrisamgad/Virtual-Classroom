
require('dotenv').config({path: './config/.env'}) //to allow access to config files
require('./db/mongoose') //For establishing mongoDB connection
const express = require('express')
const app = express()
const studentsRouter = require('./routes/student')
const teachersRouter = require('./routes/teacher')

const Student = require ('./Models/student')

const student = new Student({ fullname: 'Chris', email:'chrisamgad@yahoo.com',ID:900170819,password:'123',role:'student' });
student.save()


app.use(studentsRouter)
app.use(teachersRouter)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})