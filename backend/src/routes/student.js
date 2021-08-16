const express = require('express')
const Student = require('../Models/student')// requiring student model
var router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Student!')
  })

  router.post('/signup', async (req,res)=>{
    
    console.log((req.body)) 
    res.send('Done').status(200);

  })

module.exports=router