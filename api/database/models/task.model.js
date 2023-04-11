const mongoose= require("mongoose")
const taskmodel=mongoose.model("task",{
        title:{  type:String,
                trim:true,
                required:true,
                lowercase:true,
                minLength:5,
                maxLength:20},
        content:{ type:String, trim:true},
        file:{ }
        
})









module.exports=taskmodel