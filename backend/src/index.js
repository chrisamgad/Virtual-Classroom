
require('dotenv').config({path: './config/.env'}) //to allow access to config files
require('./db/mongoose') //For establishing mongoDB connection
const express = require('express')
const app = express()
const studentsRouter = require('./routes/student')
const teachersRouter = require('./routes/teacher')


app.use(express.json()) //express.json() automatically recognizes incoming request object as JSON objects ,then parses any incoming JSON to server into javascript Object so we are able to access these incoming messages such as req.body
app.use(express.urlencoded({ extended: true })); //Express.urlencoded() expects request data to be sent encoded in the URL, usually in strings or arrays:
                                                //In other words, handles application/x-www-form-urlencoded

app.use(express.static(__dirname + '/../public'));
const Student = require ('./Models/student')

// const student = new Student({ fullname: 'Chris', email:'chrisamgad@yahoo.com',ID:900170819,password:'123',role:'student' });
// student.save()



app.use(studentsRouter)
app.use(teachersRouter)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})