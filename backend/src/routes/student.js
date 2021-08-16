const express = require('express')

var router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Student!')
  })


module.exports=router