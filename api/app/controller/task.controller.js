const taskModel = require("../../database/models/task.model")
const helper=require("../helper")
class Task{
        static addtask =async (req,res)=>{
                try{ const  userData = new taskModel(req.body)
                        await userData.save()
                        helper.resHandler(res,200,true,userData,"tasks added successfull")
                }catch(e){
                        helper.resHandler(res,500,false,e.message,"Error adding data")
                }
        }
        static all =async(req,res)=>{
                try{
                      const alltaskes=await taskModel.find()
                        
                }catch(e){}
                       

                
              
        }
        static singletask=async(req,res)=>{
              try{
                const Task=await taskmodel.findById(req.params.id)
                       
                helper.resHandler(res,200,true,userData,"user added successfull")  
                        
                }catch(e){
                        helper.resHandler(res,500,false,e.message,"Error adding data")
                }

}}
module.exports=Task