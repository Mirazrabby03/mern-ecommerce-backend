const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/E-commerce",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() =>{
    console.log(`connection successful`);
}).catch((e) =>{
    console.log(`no connection`);
})





// Ag32_pYEy6C4mEH