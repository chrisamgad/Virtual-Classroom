const express =require('express')
var router = express.Router()

const multer  = require('multer')
const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
            return cb(new Error('Please upload a Word or PDF document'))
        }
        cb(undefined, true) //At this point, no error was found
        }
})


router.post('/createass',upload.single('Ass'), async (req,res)=>{
    console.log(req.file.buffer)  

})

module.exports=router