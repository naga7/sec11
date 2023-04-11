const userModel = require("../../database/models/user.models")
const helper=require("../helper")
class User{
        static register=async(req,res)=>{
                try{ const  userData = new userModel(req.body)
                await userData.save()
                helper.resHandler(res,200,true,userData,"user added successfull")

        }
                catch(e){
                        helper.resHandler(res,500,false,e,"Error adding data")
                }
        }
        static single = async(req,res)=>{
                try{ const userData=await userModel.findById(req.params.id)
                   helper.resHandler(res,200,true,userData,"user added successfull")
                }
                catch(e){
                        helper.resHandler(res,500,false,e.message,"Error adding data")
                }
        }
        static editsingle = async(req,res)=>{
                try{ 
                const userData=await userModel.findById(req.params.id)
                for(let key in req.body){
                        userData[key]=req.body[key]
                } await userData.save()
                   helper.resHandler(res,200,true,userData,"user added successfull")
                }
                catch(e){
                        helper.resHandler(res,500,false,e.message,"Error adding data")
                }
        }
        static activate= async(req,res)=>{
                try{ 
                const userData=await userModel.findById(req.params.id)
                userData.status=true
                 await userData.save()
                   helper.resHandler(res,200,true,userData,"user added successfull")
                }
                catch(e){
                        helper.resHandler(res,500,false,e.message,"Error adding data")
                }
        }
        static all = async(req,res)=>{
                try{
                    const userData = await userModel.find()
                    Helper.resHandler(res, 200, true, userData, "users featched")
                }
                catch(e){
                    Helper.resHandler(res, 500, false, e.message, "Error featch data")
                }
            }
        static deletall= async(req,res)=>{
                try{ 
                        await userModel.deleteMany()
                   helper.resHandler(res,200,true,{},"users deleted")
                }
                catch(e){
                        helper.resHandler(res,500,false,{},"error featch data ")
                }
        }
        static deluser= async(req,res)=>{
                
                try{
                
                   const userdata=await userModel.findByIdAndDelete(req.params.id)
                               helper.resHandler(res,200,true,userdata,"users deleted")
                              
                 } 
              
                catch(e){
                        helper.resHandler(res,500,false,e,"error featch data ")
                 }
        }
        static login= async(req,res)=>{
                try{
                        
                         const userData = await userModel.loginme(req.body.email,req.body.password)
                         const token =await userData.generateToken()
                         helper.resHandler(res,200,true,{userData,token},"done")
                }
                catch(e){helper.resHandler(res,500,false,e,e.message)

                }
        }
        static profile= async(req,res)=>{
                helper.resHandler(res,200,req.user,"fdxd")
        }
        static logout= async(req,res)=>{
                try{
                       req.user.tokens=req.user.tokens.filter(t=>t.token !=req.token)
                        await req.user.save()  
                        helper.resHandler(res,200,true,{},"logot")
                              
                } 
             
               catch(e){
                       helper.resHandler(res,500,false,e.message,"error ")
                }
        }
        static logout_lldevices= async(req,res)=>{
                try{
                       req.user.tokens=[]
                        await req.user.save()  
                        helper.resHandler(res,200,true,req.user,"logot")
                              
                } 
             
               catch(e){
                       helper.resHandler(res,500,false,e.message,"error ")
                }
        }
 }
module.exports=User