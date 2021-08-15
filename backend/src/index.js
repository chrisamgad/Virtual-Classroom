
require('dotenv').config({path: './config/.env'}) //to allow access to config files
require('./db/mongoose') //For establishing mongoDB connection
const express = require('express')
const app = express()
const Student = require ('./Models/student')

const student = new Student({ name: 'Chris', age:22 });
student.save()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})