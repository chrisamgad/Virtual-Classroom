// Using Node.js `require()`
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/virtualclassroom", {    
    useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology: true, //removes depreciation warning,
useFindAndModify:false
})