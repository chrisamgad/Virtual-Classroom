const express = require('express')

var router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello teacher!')
  })

router.post('/signup',(req,res)=>{
    res.send('teachers signup page')
  })

router.post('/login',(req,res)=>{
  res.send('teachers login page')
})
module.exports=router